// fun -- 事件函数名称
const flightPosFun = {
    init: init,
    faceCamList: [
        {
            "SnapTime": "2021-03-09 13:05:41",
            "SnapPicurl": "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-2@35-6B-5E_1_big_358b5b97-795a-4a3f-96e3-136f4bca6662.jpg?dev=cdvserver&fid=2351-14-A1680002-368533-63BA1",
            "FaceRecID": "",
            "FaceSamevalue": "0.98688924",
            "FacecamCode": "35-6B-5E_1",
            "Latitude": "31.263",
            "Longitude": "119.5932"
        },
        {
            "SnapTime": "2021-03-09 12:27:17",
            "SnapPicurl": "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-5@35-6B-68_1_big_79fc854f-bcba-468f-b98e-b7406c0aa41e.jpg?dev=cdvserver&fid=2323-14-9EE80002-3EE3271-60E43",
            "FaceRecID": "",
            "FaceSamevalue": "0.96671623",
            "FacecamCode": "35-6B-68_1",
            "Latitude": "37.8036431114725",
            "Longitude": "112.576469897274"
        },
        {
            "SnapTime": "2021-03-09 12:34:51",
            "SnapPicurl": "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-7@35-6B-68_1_big_581d4bb5-fe6c-4217-80cf-1b4d28054d43.jpg?dev=cdvserver&fid=2343-14-9FE80002-7B1019-61018",
            "FaceRecID": "",
            "FaceSamevalue": "0.96251804",
            "FacecamCode": "35-6B-68_1",
            "Latitude": "37.8036431114725",
            "Longitude": "112.576469897274"
        },
        {
            "SnapTime": "2021-03-09 12:27:41",
            "SnapPicurl": "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-6@35-6B-68_1_big_877d5ce7-3108-44e5-b4ce-eced373c8dee.jpg?dev=cdvserver&fid=2343-14-9FE80002-0-60C01",
            "FaceRecID": "",
            "FaceSamevalue": "0.95879716",
            "FacecamCode": "35-6B-68_1",
            "Latitude": "37.8036431114725",
            "Longitude": "112.576469897274"
        },
        {
            "SnapTime": "2021-03-09 12:36:10",
            "SnapPicurl": "http://172.16.0.14:8101/cds/v1/file/common*1768954645_72273/FsPicRecognition/engine-uQAd1F3ny7JG172.16.0.13/2021-03-09/fs-5@35-6B-68_1_big_ab7e8b68-fd0e-4c39-9be1-8f498d125eda.jpg?dev=cdvserver&fid=2343-14-9FE80002-8811B8-62E69",
            "FaceRecID": "",
            "FaceSamevalue": "0.95062923",
            "FacecamCode": "35-6B-68_1",
            "Latitude": "37.8036431114725",
            "Longitude": "112.576469897274"
        }
    ],
}

export default flightPosFun;

function init() {
    viewer.imageryLayers.addImageryProvider(new Cesium.QQMapsImageryProvider({
        mapStyle: Cesium.QQMapsStyle.MapDark
    }));
    viewer.scene.globe.depthTestAgainstTerrain = true;

    //Set bounds of our simulation time
    var start = Cesium.JulianDate.fromDate(new Date(2015, 2, 25, 16));
    var stop = Cesium.JulianDate.addSeconds(
        start,
        360,
        new Cesium.JulianDate()
    );
    //Make sure viewer is at the desired time.
    viewer.clock.startTime = start.clone();
    viewer.clock.stopTime = stop.clone();
    viewer.clock.currentTime = start.clone();
    viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP; //Loop at the end
    viewer.clock.multiplier = 5;

    //Set timeline to simulation bounds
    // viewer.timeline.zoomTo(start, stop);

    function computeCirclularFlight(lon, lat, height, radius) {
        console.log(lon, lat, height, radius)
        var property = new Cesium.SampledPositionProperty();
        for (var i = 0; i <= 360; i += 45) {
            console.log(start, i)
            var radians = Cesium.Math.toRadians(i);
            var time = Cesium.JulianDate.addSeconds(
                start,
                i,
                new Cesium.JulianDate()
            );
            var position = Cesium.Cartesian3.fromDegrees(
                lon + radius * 1.5 * Math.cos(radians),
                lat + radius * Math.sin(radians),
                height
            );
            // console.log(position)
            property.addSample(time, position);

        }
        return property;
    }

    var flightPos1 = [119.5932, 31.263, 0];
    var positioFlight1 = computeCirclularFlight(flightPos1[0], flightPos1[1], 2000, 0.03);
    console.log(positioFlight1)
    viewer.entities.add({
        availability: new Cesium.TimeIntervalCollection([
            new Cesium.TimeInterval({
                start: start,
                stop: stop,
            }),
        ]),
        name: 'flight1',
        orientation: new Cesium.VelocityOrientationProperty(positioFlight1),
        position: positioFlight1,
        // model: {
        //     // uri: myConfig.EXAMPLES_DATA_URL + 'data/flight/model/KJ2001.glb',
        //     uri: '/page-wutanyuan/static/img/peopleIco.png',
        //     scale: 5,
        //     minimumPixelSize: 32 // 设置飞机大小
        // },
        billboard: {
            //图标
            image: '/page-wutanyuan/static/img/peopleIco.png',
            width: 50,
            height: 56,
            scale: 1, //和原始大小相比的缩放比例
            minimumPixelSize: 100, //最小尺寸，防止太小而看不见
            distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                0.0,
                10000000
            ),
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM
        },
        path: {
            resolution: 1,
            material: new Cesium.PolylineOutlineMaterialProperty({
                color: Cesium.Color.GREEN.withAlpha(0.8),
                outlineWidth: 0
            }),
            width: 3,
        }
    });




    flyHome();
    function flyHome() {
        // if ($('body').width() < 768) {
        viewer.camera.flyTo({
            destination: Cesium.Cartesian3.fromDegrees(119.59276870281944, 31.158794346733007, 11067.100154254598),
            orientation: {
                heading: Cesium.Math.toRadians(0.47388898934087204),
                pitch: Cesium.Math.toRadians(-41.50141085543233),
                roll: Cesium.Math.toRadians(0.0018838029734099364)
            }
        });
        // }
    }
}