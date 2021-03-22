import Vue from "vue";
import mapConfig from "./mapConfig";
import sxtLayer from "@/components/mapMessageBox/sxtLayer.vue";  // 摄像头弹框
import sbLayer from "@/components/mapMessageBox/sbLayer.vue";  // 水表弹框
import zjLayer from "@/components/mapMessageBox/zjLayer.vue";  // 闸机弹框
import jgLayer from "@/components/mapMessageBox/jgLayer.vue";  // 井盖弹框
import ygLayer from "@/components/mapMessageBox/ygLayer.vue";  // 烟感弹框
import dgLayer from "@/components/mapMessageBox/dgLayer.vue";  // 道杆弹框
import flightPosFun from '@/utils/flightPos.js'

const mapView = {
    viewer: null,
    cooridor: null,
    tileset: null,
    initMap: initMap, // 初始化地图
    flyHome: flyHome, // 勘探院百度地图定位
    addDivPoints: addDivPoints, // 添加图标
    flyInACity: flyInACity, //地球进入指定坐标
    clearPic: clearPic, // 清除地图图标
    zhsqFlyHome: zhsqFlyHome, // 智慧社区指定坐标
    geoPointArr: [], //存储点状名称数组
    position: {
        x: 112.57632,
        y: 37.80476,
        h: 596.18
    },
    geometryEntityArr: [], // 图标数组
    initNavigator: initNavigator, // 修改地图工具栏
    flyToMyLocation: flyToMyLocation, // 跳转到当前定位
    replacePic: replacePic, // 替换选中图片,
    localPosition: localPosition, //定位加载图标
    divPoint: null, // 弹框对象
    messageBoxFun: messageBoxFun, // 调用地图弹框
    clearLayerBoxFun: clearLayerBoxFun, // 清除地图弹框
    setmodalEntitiesStyleFun: setmodalEntitiesStyleFun, // 设置模型颜色渲染
    addBoxByEntityFun: addBoxByEntityFun, //盒子颜色
    addLayerName: addLayerName, // 加载点状名称(社区名称)
    flightPosFun: flightPosFun, // 飞行轨迹
};
export default mapView;

/**
 * 初始化地图
 */

function initMap() {
    console.log()
    // var options = {
    //     mapStyle: Cesium.TiandituMapsStyle.IMG_C
    // };
    mapView.viewer = new Cesium.Viewer("cesiumContainer", {
        imageryProvider: new Cesium.SingleTileImageryProvider({
            url: Cesium.buildModuleUrl(
                "Assets/Textures/earth_color_low_4096.jpg"
            )
        }),
        // imageryProvider: new Cesium.TiandituImageryProvider(options),
        animation: false,
        timeline: true,
        navigation: false,
        baseLayerPicker: false,
        geocoder: false,
        homeButton: false,
        sceneModePicker: false,
        navigationHelpButton: false,
        fullscreenButton: false,
        shouldAnimate: true // 自动播放

        // 解决html2canvas结果运行无法得到场景截图：
        // contextOptions: {
        //     webgl: {
        //         alpha: true,
        //         depth: true,
        //         stencil: true,
        //         antialias: true,
        //         premultipliedAlpha: true,
        //         //通过canvas.toDataURL()实现截图需要将该项设置为true
        //         preserveDrawingBuffer: true,
        //         failIfMajorPerformanceCaveat: true
        //     }
        // }
    });
    // 百度午夜蓝风格地图
    mapView.viewer.imageryLayers.addImageryProvider(
        new Cesium.BaiduMapsImageryProvider({
            mapStyle: Cesium.BaiduMapsStyle.Midnight //"roadmap",
        })
    );
    //加载建筑物
    mapView.tileset = mapView.viewer.scene.primitives.add(
        new Cesium.Cesium3DTileset({
            url: myConfig.tilesetUrl + "tileset.json"
        })
    );
    // 2秒后地球进入指定坐标
    setTimeout(function () {
        // mapView.flyHome(mapView.position)
        mapView.zhsqFlyHome();
    }, 2000);

    window.viewer = mapView.viewer;
}
// 智慧社区定位
function zhsqFlyHome() {
    // console.log(position);
    mapView.viewer.scene.camera.flyTo({
        destination: new Cesium.Cartesian3.fromDegrees(
            121.34512,
            31.14605,
            600.55
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30.0),
            roll: Cesium.Math.toRadians(0)
        },
        duration: 3.0
    });
}
// 勘探院定位
function flyHome(position) {
    // console.log(position);
    mapView.viewer.scene.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            position.x,
            position.y,
            position.h
        ),
        orientation: {
            heading: Cesium.Math.toRadians(0),
            pitch: Cesium.Math.toRadians(-30.0),
            roll: Cesium.Math.toRadians(0)
        },
        duration: 3.0
        // orientation: {
        //     heading: Cesium.Math.toRadians(2.284714609853828),
        //     pitch: Cesium.Math.toRadians(-90),
        //     roll: Cesium.Math.toRadians(0.008855016982967265)
        // }
    });
}

// 地球进入指定坐标
function flyInACity(viewer) {
    var scene = viewer.scene;
    var camera = scene.camera;
    camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(
            112.55996,
            37.73498,
            85000.69
        ),
        complete: function () {
            setTimeout(function () {
                camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(
                        112.57632,
                        37.80476,
                        596.18
                    ),
                    orientation: {
                        heading: Cesium.Math.toRadians(2.284714609853828),
                        pitch: Cesium.Math.toRadians(-90),
                        roll: Cesium.Math.toRadians(0.008855016982967265)
                    },
                    duration: 3.0
                });
            }, 1000);
        }
    });
}

// 添加图标
function addDivPoints(type, data) {
    mapView.geometryEntityArr = [];
    var img;
    var lineColor, state;
    data.forEach(i => {
        state = i.sbzt;
        img =
            i.sbzt == "离线" ? mapConfig[type].unlineImg : mapConfig[type].img;
        lineColor =
            i.sbzt == "离线"
                ? mapConfig[type].unlineColor
                : mapConfig[type].lineColor;
        var surfacePosition = Cesium.Cartesian3.fromDegrees(i.x, i.y, 18);
        var heightPosition = Cesium.Cartesian3.fromDegrees(i.x, i.y, 49);
        // console.log(i.x, i.y, heightPosition);
        var code;
        switch (type) {
            case 'SXT':
                code = i.sxtid;
                break;
            case 'ZJ':
                code = i.zjid;
                break;
            case 'DG':
                code = i.dgid;
                break;
            case 'JG':
                code = i.jgid;
                break;
            case 'YG':
                code = i.ygid
                break;
        }
        var citizensBankPark = mapView.viewer.entities.add({
            propsData: i,
            state: state,
            code: code,
            position: heightPosition,
            polyline: {
                positions: new Cesium.ConstantProperty([
                    surfacePosition,
                    heightPosition
                ]),
                width: 1,
                material: Cesium.Color.fromCssColorString(lineColor)
                /*material : new Cesium.PolylineGlowMaterialProperty({
                glowPower : 1.2,
                taperPower:1.2,
                color : Cesium.Color.fromCssColorString('#4BE1EE').withAlpha(0.8),
            })*/
            },
            billboard: {
                //图标
                image: img,
                width: 44,
                height: 52,
                scale: 1, //和原始大小相比的缩放比例
                minimumPixelSize: 100, //最小尺寸，防止太小而看不见
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0.0,
                    10000000
                ),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            }
        });
        mapView.geometryEntityArr.push(citizensBankPark);
        mapView.viewer.flyTo(mapView.viewer.entities, {
            offset: {
                heading: Cesium.Math.toRadians(0),
                pitch: Cesium.Math.toRadians(-30),
                range: 1000
            }
        });
    });
    // 点击图标事件
    mapView.viewer.screenSpaceEventHandler.setInputAction(function (click) {
        var scene = mapView.viewer.scene;
        if (scene.mode !== Cesium.SceneMode.MORPHING) {
            var pickedObject = scene.pick(click.position);
            if (pickedObject && pickedObject.id && pickedObject.id._code) {
                var cartographic = pickedObject.primitive._actualPosition;
                // 转成经纬度
                var cartographic2 = Cesium.Cartographic.fromCartesian(
                    cartographic
                );
                var lat = Cesium.Math.toDegrees(cartographic2.latitude);
                var lng = Cesium.Math.toDegrees(cartographic2.longitude);
                var alt = cartographic2.height;
                // console.log(lng, lat, alt);
                const position = {
                    lat,
                    lng,
                    alt
                };
                console.log(type)
                // 弹框
                mapView.messageBoxFun(
                    type,
                    position,
                    pickedObject.id._propsData
                );
                mapView.replacePic(img, pickedObject.id._code); // 替换图片
                mapView.viewer.flyTo(pickedObject.id, {
                    offset: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-45),
                        range: 1000
                    }
                });
            }
        }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}

// 定位加载图标
function localPosition(id, type, data) {
    console.log(id, type, data);
    // var img = mapConfig[type].img;
    var nameId = mapConfig[type].id;
    data.features.forEach(i => {
        // console.log(i.attributes.LDID);
        if (id == i.attributes.LDID) {
            console.log("相同ID");
            var options = {
                billboard: {
                    //图标
                    image: "",
                    width: 48,
                    height: 48,
                    scale: 1, //和原始大小相比的缩放比例
                    minimumPixelSize: 100, //最小尺寸，防止太小而看不见
                    distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                        0.0,
                        10000000
                    ),
                    verticalOrigin: Cesium.VerticalOrigin.BOTTOM
                }
            };
            var promise = Cesium.GeoJsonExtendDataSource.load(i, options);
            promise.then(function (dataSource) {
                mapView.viewer.dataSources.add(dataSource);
                dataSource.name = "locateBuilding";
                dataSource.autoAvoid(mapView.viewer);
                mapView.viewer.flyTo(dataSource, {
                    offset: {
                        heading: Cesium.Math.toRadians(0.0),
                        pitch: Cesium.Math.toRadians(-45),
                        range: 400
                    }
                });
            });
        }
    });
}

// 清除弹框
function clearLayerBoxFun() {
    if (mapView.divPoint != null) {
        mapView.divPoint.destroy();
        mapView.divPoint = null;
    }
}

/*
 弹框设置
 type 类型  如：摄像头-SXT
 position 经传度对象
 prpsData 弹框传值
 */
function messageBoxFun(type, position, prpsData) {
    const positiona = new Cesium.Cartesian3.fromDegrees(
        position.lng,
        position.lat,
        position.alt
    );
    mapView.clearLayerBoxFun(); // 清除弹框
    mapView.divPoint = new Cesium.DivPoint(mapView.viewer, {
        html: "<div id='box'></div>",
        position: positiona,
        anchor: [-200, -89],
        noEvent: false
    });
    var MarkerPopup; // 挂载对象
    switch (type) {
        case "SXT":
            MarkerPopup = Vue.extend(sxtLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        case "SB":
            MarkerPopup = Vue.extend(sbLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        case "ZJ":
            MarkerPopup = Vue.extend(zjLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        case "DG":
            MarkerPopup = Vue.extend(dgLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        case "JG":
            MarkerPopup = Vue.extend(jgLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        case "YG":
            MarkerPopup = Vue.extend(ygLayer);
            new MarkerPopup({
                propsData: {
                    resultData: prpsData
                }
            }).$mount("#box");
            break;
        default:
            break;
    }
}

// 替换选中图片
function replacePic(img, id) {
    mapView.geometryEntityArr.forEach(i => {
        var imgArr = img.split(".");
        if (i._code == id) {
            // 如果点击的ID与列表中的ID相同则替换当前ID的图标，判断图片后缀
            var idxOf = imgArr[0].indexOf("-unline");
            if (i.state == "离线" && idxOf != -1) {
                i._billboard._image._value =
                    process.env.VUE_APP_NAME + imgArr[0] + "-selected.png";
            } else if (i.state == "离线") {
                i._billboard._image._value =
                    process.env.VUE_APP_NAME +
                    imgArr[0] +
                    "-unline-selected.png";
            } else {
                i._billboard._image._value =
                    process.env.VUE_APP_NAME + imgArr[0] + "-selected.png";
            }
        } else {
            // 列表中除相同ID以外的列表走这里
            var idxOf = imgArr[0].indexOf("-unline");
            if (i.state == "离线" && idxOf != -1) {
                i._billboard._image._value = process.env.VUE_APP_NAME + img;
            } else if (i.state == "离线") {
                i._billboard._image._value =
                    process.env.VUE_APP_NAME + imgArr[0] + "-unline.png";
            } else {
                i._billboard._image._value = process.env.VUE_APP_NAME + img;
            }
        }
    });
}

// 清除图标
function clearPic() {
    // 清除弹框
    if (mapView.divPoint != null) {
        mapView.divPoint.destroy();
        mapView.divPoint = null;
    }
    if (mapView.geometryEntityArr.length > 0) {
        for (var i in mapView.geometryEntityArr) {
            mapView.geometryEntityArr[i];
            mapView.viewer.entities.remove(mapView.geometryEntityArr[i]);
        }
        mapView.geometryEntityArr = [];
    }
    mapView.viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK
    );
    mapView.viewer.entities.remove(mapView.cooridor); // 清除选中盒子
    mapView.setmodalEntitiesStyleFun(); // 清除模型颜色渲染
    trackPlayback.stop(); // 清除人脸轨迹
}

// 设置模型颜色渲染
function setmodalEntitiesStyleFun(color) {
    mapView.tileset.style = new Cesium.Cesium3DTileStyle({
        color: color,
        show: true
    });
}

// 定位其中一个盒子的颜色
function addBoxByEntityFun(data) {
    // console.log(data);
    mapView.setmodalEntitiesStyleFun("color('white', 0.3)");
    if (mapView.cooridor) {
        mapView.viewer.entities.remove(mapView.cooridor);
    }
    var randomIndex = Math.ceil(260 * Math.random());
    var rings = data.features[randomIndex].geometry.rings;
    var r1 = [].concat.apply([], rings);
    var r2 = [].concat.apply([], r1);
    mapView.cooridor = mapView.viewer.entities.add({
        //红色多边形
        name: "Red polygon on surface",
        polygon: {
            hierarchy: new Cesium.Cartesian3.fromDegreesArrayHeights(r2), //hierarchy多边形层次
            extrudedHeight: data.features[randomIndex].attributes.Z + 3, //多边形的挤出面和椭圆面之间的距离（以米为单位）。
            perPositionHeight: true, //对每个位置使用options.positions的height，而不使用options.height来确定高度
            material: Cesium.Color.ORANGE.withAlpha(0.5), //橘色半透明
            outline: true,
            outlineColor: Cesium.Color.BLACK //黑色轮廓线
        }
    });
    mapView.viewer.flyTo(mapView.cooridor, {
        offset: {
            heading: Cesium.Math.toRadians(0.0),
            pitch: Cesium.Math.toRadians(-25),
            range: 200
        }
    });
}

// 加载点状名称
function addLayerName(data, type) {
    console.log(data);
    var id, name;
    if (type == "SQ") {
        id = "SQID";
        name = "SQMC";
    } else {
        id = "XQID";
        name = "XQMC";
    }
    data.features.forEach(i => {
        mapView.geoPointArr.push(i);
        var citizensBankPark = mapView.viewer.entities.add({
            id: i.properties[id],
            position: Cesium.Cartesian3.fromDegrees(
                i.geometry.coordinates[0],
                i.geometry.coordinates[1],
                i.geometry.coordinates[2]
            ),
            label: {
                //文字标签
                text: i.properties[name],
                font: "16px 微软雅黑",
                style: Cesium.LabelStyle.FILL_AND_OUTLINE,
                fillColor: Cesium.Color.AQUA,
                outlineWidth: 2,
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向以底部来计算标签的位置
                pixelOffset: new Cesium.Cartesian2(0, -18), //偏移量
                disableDepthTestDistance: 350000,
                distanceDisplayCondition: new Cesium.DistanceDisplayCondition(
                    0,
                    1000
                ),
                scaleByDistance: new Cesium.NearFarScalar(
                    200000,
                    1.2,
                    100000000000,
                    0.5
                )
            }
        });
        // mapView.geometryEntityArr.push(citizensBankPark);
        // mapView.viewer.flyTo(mapView.viewer.entities, {
        //     offset: {
        //         heading: Cesium.Math.toRadians(0.0),
        //         pitch: Cesium.Math.toRadians(-30),
        //         range: 1000
        //     }
        // });
    });
}

/**
 * 修改地图工具栏
 */

function initNavigator(viewer) {
    //显示刷新率和帧率
    viewer.scene.debugShowFramesPerSecond = false;
    viewer.extend(Cesium.viewerCesiumNavigationMixin, {
        enableZoomControls: false,
        enableCompass: true
    });
}

// 跳转到当前定位
function flyToMyLocation(viewer) {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        //alert('成功' + position.coords.latitude)
        var target = Cesium.Cartesian3.fromDegrees(
            position.coords.longitude,
            position.coords.latitude
        );
        var offset = new Cesium.HeadingPitchRange(0, -Math.PI / 3, 5000);
        viewer.camera.lookAt(target, offset);
        viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY);
    });
}
