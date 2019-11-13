import Vue from "vue";
import Router from "vue-router";

const homepage = r =>
  require.ensure([], () => r(require("@/view/homepage/index.vue")), "homepage");
const home = r =>
  require.ensure([], () => r(require("@/view/home/index.vue")), "home");

const article = r =>
  require.ensure([], () => r(require("@/view/Article/index.vue")), "article");
const webnote = r =>
  require.ensure(
    [],
    () => r(require("@/view/web/index.vue")),
    "web"
  );
const otherNote = r =>
  require.ensure(
    [],
    () => r(require("@/view/otherNote/index.vue")),
    "otherNote"
  );
const case3D = r =>
  require.ensure(
    [],
    () => r(require("@/view/3dMax/index.vue")),
    "case3D"
  );

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/homepage",
      name: "homepage",
      component: homepage,
      children: [
        {
          path: "/home",
          name: "home",
          component: home,
          meta: {
            metaInfo: {
              title: "孙华鹏的博客",
              keywords: "",
              description: "孙华鹏的博客，主要以笔记，生活，摄影为主..."
            }
          }
        },
        {
          path: "/web",
          name: "webnote",
          component: webnote,
          meta: {
            metaInfo: {
              title: "前端热门技术",
              keywords: "",
              description: "主要为前端技术笔记，涵盖内容广泛..."
            }
          }
        },
        {
          path: "/threejs",
          name: "threejs",
          component: case3D,
          meta: {
            metaInfo: {
              title: "threejs 案例",
              keywords: "",
              description: "threejs 案例"
            }
          }
        },
        {
          path: "/note",
          name: "otherNote",
          component: otherNote,
          meta: {
            metaInfo: {
              title: "杂学笔记",
              keywords: "",
              description: "学习笔记，涵盖内容广泛..."
            }
          }
        }
      ]
    },
    {
      path: "/article",
      name: "Article",
      component: article,
      meta: {
        metaInfo: {
          title: "文章内容",
          keywords: "",
          description: "主要为前端技术笔记，涵盖内容广泛..."
        }
      }
    },
    {
      path: "*",
      redirect: "/home"
    }
  ]
});

router.beforeEach((to, from, next) => {
  if(to.meta){
    document.title = to.meta.metaInfo.title || '孙华鹏的博客'
  } else{
    document.title = '孙华鹏的博客'
  }
  next()
});

export default router