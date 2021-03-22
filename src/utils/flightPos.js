// fun -- 飞行轨迹
const flightPosFun = {
    init: init,
    faceCamList: [
    ],
}

export default flightPosFun;

let historyGeoData
function init() {
    viewer.imageryLayers.addImageryProvider(new Cesium.QQMapsImageryProvider({
        mapStyle: Cesium.QQMapsStyle.MapDark
    }));
    viewer.scene.globe.depthTestAgainstTerrain = true;


    let arr = [], time = [];
    flightPosFun.faceCamList.forEach(item => {
        if (item.Longitude !== '' || item.Latitude !== '') {
            arr.push([Number(item.Longitude), Number(item.Latitude)])
            let date = item.SnapTime.substring(0, 19);
            date = date.replace(/-/g, '/'); //必须把日期'-'转为'/'
            var timestamp = new Date(date).getTime();
            time.push(timestamp)
        } else {
            // console.log(item)
        }
    })

    historyGeoData = {
        type: "FeatureCollection",
        features: [{
            "type": "Feature",
            "geometry": {
                "type": "MultiPoint",
                "coordinates": arr
            },
            "properties": {
                "time": time
            }
        }
        ]
    };



    trackPlayback.start(historyGeoData)

    //setTimeout(function () {
    trackPlayback.play(historyGeoData)
}

//历史轨迹回放对象
window.trackPlayback = {
    historyPath: null,//历史轨迹线图层
    historyPathEntity: null,//历史轨迹线模拟对象
    isWorking: false,//用于切换模块时判断是否正在工作
    startTime: null,//历史轨迹模拟起始时间
    stopTime: null,//历史轨迹模拟终止时间
    historyGeoData: historyGeoData,
    /**
     * 开始回放历史轨迹--添加历史轨迹线图层
     * @param {GeoJson} 轨迹点数据
     */
    start: function (data) {
        var that = this;
        this.historyGeoData = data || this.historyGeoData;
        if (this.historyPath) {
            viewer.dataSources.remove(this.historyPath);
            this.historyPath = null;
        }
        var options = {
            billboard: {
                image: '/page-wutanyuan/static/img/dg.png',
                width: 16,
                height: 20,
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        };
        viewer.dataSources.add(Cesium.GeoJsonExtendDataSource.load(this.historyGeoData, options)).then(function (ds) {
            that.historyPath = ds;
            viewer.flyTo(ds, {
                // offset: {
                //     heading: Cesium.Math.toRadians(0.0), // 航向角（以弧度为单位）。
                //     pitch: Cesium.Math.toRadians(-30), //俯仰角（以弧度为单位）。
                //     range: 0 // 距中心的距离，以米为单位。
                // }
                offset: {
                    heading: Cesium.Math.toRadians(0),
                    pitch: Cesium.Math.toRadians(-30),
                    range: 0
                }
            });
            that.play(that.historyGeoData);
        });
    },
    /**
     * 开始回放历史轨迹--模拟运动轨迹
     * @param {GeoJson} 轨迹点数据
     */
    play: function (historyGeoData) {
        if (this.historyPathEntity) {
            viewer.entities.remove(this.historyPathEntity);
            this.historyPathEntity = null;
        }
        var positionProperty = new Cesium.SampledPositionProperty();
        var coordinates = historyGeoData.features[0].geometry.coordinates;

        for (var i = 0; i < coordinates.length; i++) {
            var coordinate = coordinates[i];
            var position = Cesium.Cartesian3.fromDegrees(coordinate[0], coordinate[1], 0);
            var timeS = historyGeoData.features[0].properties.time[i];
            var time = Cesium.JulianDate.fromDate(new Date(timeS));
            positionProperty.addSample(time, position);
            if (i == 0) {
                this.startTime = time;
            } else if (i == coordinates.length - 1) {
                this.stopTime = time;
            }
        }

        viewer.clock.startTime = this.startTime.clone();
        viewer.clock.stopTime = this.stopTime.clone();
        viewer.clock.currentTime = this.startTime.clone();
        viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
        viewer.clock.multiplier = 10;
        viewer.clock.shouldAnimate = true;
        //Set timeline to simulation bounds
        viewer.timeline.zoomTo(this.startTime, this.stopTime);
        this.historyPathEntity = viewer.entities.add({

            //Set the entity availability to the same interval as the simulation time.
            availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({
                start: this.startTime,
                stop: this.stopTime
            })]),

            //Use our computed positions
            position: positionProperty,

            //Automatically compute orientation based on position movement.
            orientation: new Cesium.VelocityOrientationProperty(positionProperty),

            //Load the Cesium plane model to represent the entity
            billboard: {
                width: 50,
                height: 56,
                image: '/page-wutanyuan/static/img/peopleIco.png',
                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            //Show the path as a pink line sampled in 1 second increments.
            path: {
                resolution: 1,
                material: new Cesium.PolylineGlowMaterialProperty({
                    glowPower: 0.2,
                    color: Cesium.Color.fromCssColorString('#1EF0ED')
                }),
                width: 10
            },
            // polyline: {
            //     positions: parent.Cesium.Cartesian3.fromDegreesArray([-75, 35, -125, 35]),
            //     width: 5,
            //     material: parent.Cesium.Color.RED,
            //     clampToGround: true
            // }
        });

        this.historyPathEntity.position.setInterpolationOptions({
            interpolationDegree: 1,
            interpolationAlgorithm: Cesium.HermitePolynomialApproximation
        });
    },
    /**
     *暂停回放历史轨迹
     */
    pause: function () {
        viewer.clock.shouldAnimate = !viewer.clock.shouldAnimate;
    },
    stop: function () {
        // viewer.timeline.container.style.display="none";
        // viewer.animation.container.style.display="none";
        // viewer.statusBar.container.style.bottom="0";
        if (this.historyPathEntity) {
            viewer.entities.remove(this.historyPathEntity);
            this.historyPathEntity = null;
        }
        if (this.historyPath) {
            viewer.dataSources.remove(this.historyPath);
            this.historyPath = null;
        }
        viewer.clock.shouldAnimate = false;
    }
};