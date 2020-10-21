/*

 ------------------------------------------------------------------------------------
 | wc-conduit: RealWorld Conduit Application Client using mg_webComponents          |
 |                                                                                  |
 | Copyright (c) 2020 M/Gateway Developments Ltd,                                   |
 | Redhill, Surrey UK.                                                              |
 | All rights reserved.                                                             |
 |                                                                                  |
 | http://www.mgateway.com                                                          |
 | Email: rtweed@mgateway.com                                                       |
 |                                                                                  |
 |                                                                                  |
 | Licensed under the Apache License, Version 2.0 (the "License");                  |
 | you may not use this file except in compliance with the License.                 |
 | You may obtain a copy of the License at                                          |
 |                                                                                  |
 |     http://www.apache.org/licenses/LICENSE-2.0                                   |
 |                                                                                  |
 | Unless required by applicable law or agreed to in writing, software              |
 | distributed under the License is distributed on an "AS IS" BASIS,                |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.         |
 | See the License for the specific language governing permissions and              |
 |  limitations under the License.                                                  |
 ------------------------------------------------------------------------------------

  21 October 2020

*/

import {userSettings} from './userSettings.js';
import {webComponents} from '../../mg-webComponents.js';
import {home_page_assembly} from './home.js';
import {article_assembly} from './article.js';
import {new_article_assembly} from './new-article.js';
import {profile_assembly} from './profile.js';
import {login_assembly} from './login.js';
import {signup_assembly} from './signup.js';
import {settings_assembly} from './settings.js';
import {apis} from './apis-rest.js';

let count = 0;

document.onmouseover = function() {
    //User's mouse is inside the page.
    window.innerDocClick = true;
}

document.onmouseleave = function() {
    //User's mouse has left the page.
    window.innerDocClick = false;
}


window.addEventListener('beforeunload', function (e) {
  // Alert the user to optionally cancel the reload event
  e.preventDefault(); // If you prevent default behavior in Mozilla Firefox prompt will always be shown
  // Chrome requires returnValue to be set
  e.returnValue = 'xxxxx';
});

document.addEventListener('DOMContentLoaded', function() {

  let context = {
    paths: {
      conduit: './components/conduit/',
    },
    host: userSettings.host || '',
    defaultImage: userSettings.defaultImage || '',
    formatDate: function(date) {
      let d = new Date(date);
      let month = ["January","February","March","April","May","June","July","August","September","October","November","December",];
      return month[d.getMonth()] + " " + d.getDate() +", " + d.getFullYear();
    }
  };

  webComponents.addComponent('home_page', home_page_assembly());
  webComponents.addComponent('article', article_assembly());
  webComponents.addComponent('new_article', new_article_assembly());
  webComponents.addComponent('profile', profile_assembly());
  webComponents.addComponent('login', login_assembly());
  webComponents.addComponent('signup', signup_assembly());
  webComponents.addComponent('settings', settings_assembly());

  // this mainview function will be used by the login hook - it will pick it up
  // from the context object

  webComponents.register('home_page', webComponents.components.home_page);
  webComponents.register('article', webComponents.components.article);
  webComponents.register('new_article', webComponents.components.new_article);
  webComponents.register('profile', webComponents.components.profile);
  webComponents.register('login', webComponents.components.login);
  webComponents.register('signup', webComponents.components.signup);
  webComponents.register('settings', webComponents.components.settings);

  // set up the display

  let body = document.getElementsByTagName('body')[0];

  webComponents.loadWebComponent('conduit-root', body, context, function(root) {

    window.addEventListener('popstate', function(event) {
      if (!window.innerDocClick) {
        //console.log('back button was clicked!');
        root.homeLink.click();
      }
      window.history.pushState({}, '');
    });

    let components = webComponents.components;
    context.root = root;
    root.apis = apis(context).apis;
    root.switchToPage('home_page');
    window.history.pushState({}, '');
  });

});
