<template>
    <div class="gis-container">
        <div id="cesiumContainer" class="map"></div>
    </div>
</template>

<script>
import mapView from "@/utils/mapView.js";
export default {
    name: "MapContainer",
    components: {},
    data() {
        return {
            viewer: null, // 三维地图对象
            id: "",
        };
    },
    mounted() {
        // mapView.initMap(); // 不用全局定义
        this.$mapView.initMap();
    },
    methods: {},
};
</script>

<style lang="less" scoped>
.map {
    margin: 0 auto;
    width: 100%;
    height: 100vh;
    overflow: hidden;

    // .cesium-widget-credits{
    //     display: none;
    // }

    // .cesium-home-button{
    //     display: none;
    // }
}
</style>
