<template>
  <div
    class="china-map"
    id="china-map"
  >
  </div>
</template>
<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { GUI } from "three/examples/jsm/libs/dat.gui.module";
import {
  CSS2DObject,
  CSS2DRenderer
} from "three/examples/jsm/renderers/CSS2DRenderer";

export default {
  name: "china-map",
  data() {
    return {
      scene: null, //场景
      camera: null, //相机
      renderer: null, //渲染器
      labelRenderer: null, //2d渲染器
      controls: null, //鼠标操作
      width: null,
      height: null,
      rayList: [], //射线元素数组
      spotLight: null, //灯光
      allGroup: null, // 创建好的物体 统一放在这里进行比例缩放
      pointGroup: null, //定点组
      lineGroup: null, // 线框组
      mapGroup: null, //挤压组
      lightGroup: null,
      raycaster: null, //射线
      mouse: null, // 射线检测鼠标
      gui: null, //GUI
      radius: 500,
      thetax: 0,
      thetay: 1,
      lightStop: true,
      delPoint: null,
      addArr: [], // 坐标点合集
      preMesh: null, //上一个点击的城市名称
      movingLight1: null,
      movingLight2: null,
      cityArr: ["浙江省", "辽宁省", "山东省", "天津市"], //去过的城市集合
      d: 0.5,
      guiParams: {
        showLight1: false,
        showLight2: false
      }
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    // 初始化
    init() {
      this.container = document.getElementById("china-map");
      this.width = this.container.offsetWidth;
      this.container.style.height = this.width * 0.618 + "px"; //黄金比例
      this.height = this.container.offsetHeight;
      this.container.addEventListener(
        "mousedown",
        this.onDocumentMouseDown,
        false
      );
      this.raycaster = new THREE.Raycaster();
      this.mouse = new THREE.Vector2();
      this.setScene();
      this.setCamera();
      this.drapMap();
      this.setRenderer();
      this.setLight();
      this.setMovingLight();
      this.setControals();
      this.setHelper();
      this.setMotto();
      // this.setGui();
    },
    // 初始化gui
    setGui() {
      this.gui = new GUI();
      this.gui.add(this.guiParams, "showLight1");
      this.gui.add(this.guiParams, "showLight2");
    },
    onDocumentMouseDown(event) {
      this.mouse.x = (event.offsetX / this.width) * 2 - 1;
      this.mouse.y = -(event.offsetY / this.height) * 2 + 1;
      // 创建射线
      this.raycaster.setFromCamera(this.mouse, this.camera);
      // 创建射线交错的物体
      var intersects = this.raycaster.intersectObjects(this.rayList);
      // 判断是否有交错物体
      if (intersects.length > 0) {
        let obj = intersects[0].object;
        // 如果有被删除的定位点 就给加上
        if (this.delPoint) {
          this.pointGroup.add(this.delPoint);
        }
        // 如果交错物体为点亮区域
        if (this.cityArr.indexOf(obj.name) !== -1) {
          this.delPoint = this.pointGroup.getObjectByName(obj.name);
          this.pointGroup.remove(this.delPoint);
        }
        if (this.preMesh) {
          this.preMesh.remove(
            this.preMesh.children[this.preMesh.children.length - 1]
          );
        }
        this.set2Dtext(obj);
      }
    },
    // 绘制地图
    drapMap() {
      this.$axios.get("static/svg/china.json").then(res => {
        let features = res.data.features;
        features.forEach((ele, index) => {
          this.setShape(ele, index);
        });
      });
    },
    // 创建地图拉伸几何体
    setShape(data, index) {
      let pointArr;
      let areaInfo = data.properties;
      if (data.geometry.coordinates[0].length === 1) {
        pointArr = data.geometry.coordinates[0][0];
      } else {
        pointArr = data.geometry.coordinates[0];
      }
      this.setLine(pointArr);
      var shape = new THREE.Shape();
      // shape.absarc(50,50,40,0,2*Math.PI);//圆弧
      pointArr.forEach((ele, i) => {
        if (i === 0) {
          shape.moveTo(ele[0], ele[1]);
        } else {
          shape.lineTo(ele[0], ele[1]);
        }
      });

      var geometry = new THREE.ExtrudeGeometry( //拉伸造型
        shape, //二维轮廓
        //拉伸参数
        {
          depth: 0.5,
          bevelEnabled: false,
          bevelThickness: 1.5,
          bevelSize: 0,
          bevelSegments: 1
        }
      );
      var material = new THREE.MeshPhongMaterial({
        color: 0x3783e0,
        side: THREE.DoubleSide, //两面可见
        transparent: true, // 是否透明
        // wireframe: true,
        opacity: 0.8 //透明度
      }); //材质对象

      var mesh = new THREE.Mesh(geometry, material); //网格模型对象

      mesh.userData = areaInfo;
      mesh.name = areaInfo.name;
      if (this.cityArr.indexOf(mesh.name) !== -1) {
        material.color.set(0x70b0ff);
        this.setSpirte(mesh);
      }
      this.rayList.push(mesh);

      this.mapGroup.add(mesh);
    },
    // 创建定位点
    setSpirte(mesh) {
      var texture = new THREE.TextureLoader().load(
        "../../../../static/image/add.png"
      );

      var spriteMaterial = new THREE.SpriteMaterial({
        map: texture, //设置精灵纹理贴图
        alphaTest: 0.1
      });

      // 创建精灵模型对象
      var sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(0.8, 1, 1);
      sprite.name = mesh.name;
      this.pointGroup.add(sprite);
      this.addArr.push(sprite);
      sprite.position.set(mesh.userData.cp[0], mesh.userData.cp[1], 1);
    },
    // 创建2d签名
    setMotto() {
      var earthDiv = document.createElement("div");
      earthDiv.innerHTML = `<div>
        微风不燥，阳光正好<br/>
        &nbsp&nbsp&nbsp&nbsp你还年轻，我还未老...
      </div>`;
      earthDiv.style.fontSize = "24px";
      earthDiv.style.color = "#4d4d4d";
      var earthLabel = new CSS2DObject(earthDiv);

      earthLabel.position.set(-110, -80, 0);

      var geometry = new THREE.PlaneGeometry(200, 50, 32);
      var material = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        side: THREE.DoubleSide,
        transparent: true, // 是否透明
        opacity: 0, //透明度
        alphaTest: 0.1
      });

      var plane = new THREE.Mesh(geometry, material);
      plane.position.set(2, 2, 5);
      plane.add(earthLabel);
      this.scene.add(plane);
    },
    // 创建2d名称
    set2Dtext(mesh) {
      // 创建2d名称
      var earthDiv = document.createElement("div");
      earthDiv.className = "label";
      earthDiv.textContent = mesh.name;
      earthDiv.style.marginTop = "-1em";
      earthDiv.style.fontSize = "16px";
      var earthLabel = new CSS2DObject(earthDiv);
      earthLabel.position.set(mesh.userData.cp[0], mesh.userData.cp[1], 0);
      mesh.add(earthLabel);
      this.preMesh = mesh;
    },

    // 创建线条
    setLine(data) {
      let newArr = [];
      data.forEach(ele => {
        newArr.push(...ele);
        newArr.push(0);
      });
      let geometry = new THREE.BufferGeometry();
      let vertices = new Float32Array(newArr);
      let attribue = new THREE.BufferAttribute(vertices, 3); //每三个为一组  代表xyz坐标
      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;

      // 线条渲染模式
      let material = new THREE.LineBasicMaterial({
        color: 0x2b51ed //线条颜色
      }); //材质对象
      // console.log(geometry);

      let colorArr = [];
      // console.log(newArr)
      newArr.forEach(e => {
        colorArr.push(this.getRandomArbitrary(0, 1));
      });

      let color = new Float32Array(colorArr);
      geometry.attributes.color = new THREE.BufferAttribute(color, 3);

      let line = new THREE.Line(geometry, material); //线条模型对象
      this.lineGroup.add(line);
      this.lineGroup.position.z = 0.5;
    },
    // 范围随机数
    getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    },

    // 创建场景
    setScene() {
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0xffffff);
      this.allGroup = new THREE.Group();
      this.allGroup.name = "all";
      this.pointGroup = new THREE.Group();
      this.pointGroup.name = "point";
      this.lineGroup = new THREE.Group();
      this.lineGroup.name = "line";
      this.mapGroup = new THREE.Group();
      this.mapGroup.name = "map";
      this.lightGroup = new THREE.Group();
      this.lightGroup.name = "light";
      this.allGroup.add(this.pointGroup);
      this.allGroup.add(this.lineGroup);
      this.allGroup.add(this.mapGroup);
      this.allGroup.scale.set(8, 8, 8);
      this.allGroup.position.set(-820, -250, 0);
      this.scene.add(this.allGroup);
      this.scene.add(this.lightGroup);
    },
    // 创建相机
    setCamera() {
      this.camera = new THREE.PerspectiveCamera(
        60,
        this.width / this.height,
        1,
        20000
      );
      this.camera.position.set(0, -100, 200);
      // this.camera.lookAt(this.scene.position);
    },
    // 创建渲染器
    setRenderer() {
      this.renderer = new THREE.WebGLRenderer({
        antialias: true
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.width, this.height);
      this.container.appendChild(this.renderer.domElement); //body元素中插入canvas对象

      this.labelRenderer = new CSS2DRenderer();
      this.labelRenderer.setSize(this.width, this.height);
      this.labelRenderer.domElement.style.position = "absolute";
      this.labelRenderer.domElement.style.top = 0 + "px";
      this.container.appendChild(this.labelRenderer.domElement);
    },

    // 创建鼠标
    setControals() {
      this.controls = new TrackballControls(this.camera, this.container);
      // this.controls = new TrackballControls(this.camera);
      this.controls.enabled = true; // 是否启用控件
      this.controls.enableZoom = true;
      this.controls.rotateSpeed = 0.2; //旋转速度
      this.controls.noRotate = true; //是否不旋转
      this.controls.zoomSpeed = 0.2; //缩放速度
      this.controls.noZoom = true; //是否不缩放
      this.controls.panSpeed = 0.2; //移动速度
      this.controls.noPan = false; //是否不移动
      this.controls.staticMoving = false; //是否禁用阻尼。默认值为false。
      this.controls.dynamicDampingFactor = 0.05;
      this.controls.screen = { width: this.width, height: this.height };
      // this.controls.maxDistance = 200;
      // this.controls.minDistance = 800;
    },
    // 创建灯光
    setLight() {
      var ambient = new THREE.AmbientLight(0xacd1ff, 1);
      this.scene.add(ambient);
      this.spotLight = new THREE.SpotLight(0xffffff, 1);
      this.spotLight.position.set(500, 200, 400);
      this.lightGroup.add(this.spotLight);
    },
    // 创建移动灯光
    setMovingLight() {
      let sphere = new THREE.SphereBufferGeometry(2, 16, 8);
      this.movingLight1 = new THREE.PointLight(0xffffff, 2, 100);
      this.movingLight1.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0x57ccff }))
      );
      this.movingLight1.position.set(10, 10, 30);
      this.lightGroup.add(this.movingLight1);

      this.movingLight2 = new THREE.PointLight(0xa40000, 10, 50);
      this.movingLight2.add(
        new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xf286c4 }))
      );
      this.movingLight2.position.set(10, 10, 30);
      this.lightGroup.add(this.movingLight2);
    },

    // 创建辅助线
    setHelper() {
      var axisHelper = new THREE.AxisHelper(250);
      // this.scene.add(axisHelper);

      var spotLightHelper = new THREE.SpotLightHelper(this.spotLight);
      // this.scene.add(spotLightHelper)

      var cameraHelper = new THREE.CameraHelper(this.camera);
      // this.scene.add(cameraHelper)

      var helper = new THREE.GridHelper(1200, 60, 0x91caff, 0x91caff);
      helper.rotation.x = 0.5 * Math.PI;
      this.scene.add(helper);
    },
    // 动态渲染
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.controls.handleResize();
      this.labelRenderer.render(this.scene, this.camera);
      this.render();
    },

    // 渲染
    render() {
      this.controls.update();
      let time = Date.now() * 0.0002;

      if (this.lightStop) {
        this.thetax += 0.05;
      } else {
        this.thetax -= 0.05;
      }
      // 监听是否需要显示灯光
      this.movingLight1.visible = this.guiParams.showLight1;
      if (this.guiParams.showLight1) {
        this.movingLight1.position.x = Math.sin(time * 0.7) * 150;
        this.movingLight1.position.y = Math.cos(time * 0.5) * 100;
      }
      this.movingLight2.visible = this.guiParams.showLight2;
      if (this.guiParams.showLight2) {
        this.movingLight2.position.x = Math.cos(time * 0.7) * 150;
        this.movingLight2.position.y = Math.sin(time * 0.5) * 100;
      }

      this.spotLight.position.x =
        this.radius * Math.sin(THREE.Math.degToRad(this.thetax));

      let t = this.spotLight.position.x;
      if (t >= 900) {
        this.lightStop = false;
      } else if (t <= -900) {
        this.lightStop = true;
      }
    }
  }
};
</script>
<style lang="less" scope>
.label {
  color: #2428a5;
  font-family: sans-serif;
  padding: 2px;
  text-shadow: 1px 1px 1px #fff;
  font-weight: 900;
}
.china-map {
  position: relative;
}
</style>