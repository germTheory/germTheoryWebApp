describe('States', function() {
  var $state;

  beforeEach(module('app'));

  beforeEach(inject(function($injector){
    $state = $injector.get('$state');
  }));

  it('should have tab state, template, and controller', function () {
    expect($state.get('tab')).to.be.ok();
    expect($state.get('tab').abstract).to.be.true;
    expect($state.get('tab').templateUrl).to.be('templates/tabs.html');
    expect($state.href('tab')).to.be.equal('#/tab');
  });

  it('should have tab.map state, template, and controller', function () {
    expect($state.get('tab.map')).to.be.ok();
    expect($state.get('tab.map').views['tab-map'].controller).to.be('MapCtrl');
    expect($state.get('tab.map').views['tab-map'].templateUrl).to.be('templates/map.html');
    expect($state.href('tab.map')).to.be.equal('#/tab/map');
  });

  it('should have tab.myrisk state, template, and controller', function () {
    expect($state.get('tab.myrisk')).to.be.ok();
    expect($state.get('tab.myrisk').views['tab-myrisk'].controller).to.be('MyRiskCtrl');
    expect($state.get('tab.myrisk').views['tab-myrisk'].templateUrl).to.be('templates/myrisk.html');
    expect($state.href('tab.myrisk')).to.be.equal('#/tab/myrisk');
  });

  it('should have tab.report state, template, and controller', function () {
    expect($state.get('tab.report')).to.be.ok();
    expect($state.get('tab.report').views['tab-report'].templateUrl).to.be('templates/report.html');
    expect($state.href('tab.report')).to.be.equal('#/tab/report');
  });

  it('should have tab.settings state, template, and controller', function () {
    expect($state.get('tab.settings')).to.be.ok();
    expect($state.get('tab.settings').views['tab-settings'].controller).to.be('SettingsCtrl');
    expect($state.get('tab.settings').views['tab-settings'].templateUrl).to.be('templates/settings.html');
    expect($state.href('tab.settings')).to.be.equal('#/tab/settings');
  });

  it('should have tab.settings-edit state, template, and controller', function () {
    expect($state.get('tab.settings-edit')).to.be.ok();
    expect($state.get('tab.settings-edit').views['tab-settings'].controller).to.be('SettingsCtrl');
    expect($state.get('tab.settings-edit').views['tab-settings'].templateUrl).to.be('templates/edit-info.html');
    expect($state.href('tab.settings-edit')).to.be.equal('#/tab/settings-edit');
  });

  it('should have landing state, template, and controller', function () {
    expect($state.get('landing')).to.be.ok();
    expect($state.get('landing').controller).to.be('UserCtrl');
    expect($state.get('landing').templateUrl).to.be('templates/landing.html');
    expect($state.href('landing')).to.be.equal('#/landing');
  });

  it('should have signin state, template, and controller', function () {
    expect($state.get('signin')).to.be.ok();
    expect($state.get('signin').controller).to.be('UserCtrl');
    expect($state.get('signin').templateUrl).to.be('templates/signin.html');
    expect($state.href('signin')).to.be.equal('#/signin');
  });

  it('should have signup state, template, and controller', function () {
    expect($state.get('signup')).to.be.ok();
    expect($state.get('signup').controller).to.be('UserCtrl');
    expect($state.get('signup').templateUrl).to.be('templates/signup.html');
    expect($state.href('signup')).to.be.equal('#/signup');
  });

  it('should have get-started state, template, and controller', function () {
    expect($state.get('get-started')).to.be.ok();
    expect($state.get('get-started').controller).to.be('UserCtrl');
    expect($state.get('get-started').templateUrl).to.be('templates/get-started.html');
    expect($state.href('get-started')).to.be.equal('#/get-started');
  });
});
