const Genetator = require('yeoman-generator');

module.exports = class extends Genetator {
  prompting() {
    return this.prompt({
      type: 'input',
      name: 'name',
      message: 'Your project name',
      default: this.appname,
    }).then((answers) => {
      this.answers = answers;
    });
  }

  writing() {
    const templates = [
      'babel.config.js',
      'cypress.json',
      'jsconfig.json',
      'mock/db.json',
      'mock/json-server.json',
      'mock/post-to-get.js',
      'mock/routes.json',
      'package.json',
      'public/favicon.ico',
      'public/index.html',
      'README.md',
      'src/App.vue',
      'src/assets/js/api/api-client.js',
      'src/assets/js/api/index.js',
      'src/assets/js/utils/index.js',
      'src/assets/logo.png',
      'src/components/HelloWorld.vue',
      'src/components/MyMap.vue',
      'src/components/MyMarker.vue',
      'src/composables/useMouse.js',
      'src/main.js',
      'src/router/index.js',
      'src/store/index.js',
      'src/views/About.vue',
      'src/views/Home.vue',
      'src/views/Study.vue',
      'src/views/suspense',
      'src/views/suspense/AsyncComponent.vue',
      'src/views/suspense/Suspense.vue',
      'tests/e2e/plugins',
      'tests/e2e/plugins/index.js',
      'tests/e2e/specs/test.js',
      'tests/e2e/support/commands.js',
      'tests/e2e/support/index.js',
      'tests/test.js',
      'tests/unit/example.spec.js',
      'vue.config.js',
    ];

    templates.forEach((item) => {
      this.fs.copyTpl(
        this.templatePath(item),
        this.destinationPath(item),
        this.answers
      );
    });
  }
};
