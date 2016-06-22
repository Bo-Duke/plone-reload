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
    // oh yeah, have to change that (oopsie)
    myHeaders.append("Authorization", your_authorization);
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
            if(el.getElementsByTagName('pre').length === 0) {
                let error = el.getElementsByTagName('strong');
                atom.notifications.addError(error[0].innerHTML, { "detail": error[1].innerHTML });
            }
            else {
                let error = el.getElementsByTagName('pre')[0].innerHTML;
                let errorTitle = error.split("\n")[0];
                atom.notifications.addSuccess(errorTitle, { "detail": error.replace(errorTitle,"") });
            }
        });
    });
  }
};
