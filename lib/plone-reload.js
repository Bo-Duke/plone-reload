'use babel';

import { CompositeDisposable } from 'atom';

export default {
  subscriptions: null,
  NotificationManager: null,

  activate(state) {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'plone-reload:reload': () => this.reload()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  reload() {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Basic YWRtaW46VVdxbW1zS1JhYXdS");
    var myInit = { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default'
           };
    var myRequest = new Request('http://localhost:8080/@@reload?action=code',myInit);
    fetch(myRequest,myInit).then(function(response) {
        response.text().then((res) => {
            let el = document.createElement('html');
            el.innerHTML = res;
            atom.notifications.addSuccess(el.getElementsByTagName('pre')[0].innerHTML);
        });
    });
  }
};
