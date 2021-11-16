const Vue = require("vue");
const server = require("express")();

const template = require("fs").readFileSync("./index.template.html", "utf-8");

const renderer = require("vue-server-renderer").createRenderer({
  template,
});

const context = {
  title: "vue ssr",
  metas: `
  <link rel="canonical" href="https://www.baidu.com" />
  <meta property="fb:app_id" content="264197305525058" />
<meta property="og:url" content="https://www.baidu.com" />
<meta property="og:title" content="your_link_title">
<meta property="og:image" content="https://rockflow-web-template.oss-cn-hongkong.aliyuncs.com/email-template/captcha-en.png">
  `,
};
server.get("/a/b", (req, res) => {
  res.send(200);
});

server.get("*", (req, res) => {
  const app = new Vue({
    data: {
      url: req.url,
    },
    template: `<div>访问的 URL 是： {{ url }}</div>`,
  });
  renderer.renderToString(app, context, (err, html) => {
    console.log(err);
    if (err) {
      res.status(500).end("Internal Server Error");
      return;
    }
    res.end(html);
  });
});

server.listen(8000);
