/*

 ----------------------------------------------------------------------------
 | conduit-ui: RealWorld Conduit UI WebComponents Library                    |
 |                                                                           |
 | Copyright (c) 2020 M/Gateway Developments Ltd,                            |
 | Redhill, Surrey UK.                                                       |
 | All rights reserved.                                                      |
 |                                                                           |
 | http://www.mgateway.com                                                   |
 | Email: rtweed@mgateway.com                                                |
 |                                                                           |
 |                                                                           |
 | Licensed under the Apache License, Version 2.0 (the "License");           |
 | you may not use this file except in compliance with the License.          |
 | You may obtain a copy of the License at                                   |
 |                                                                           |
 |     http://www.apache.org/licenses/LICENSE-2.0                            |
 |                                                                           |
 | Unless required by applicable law or agreed to in writing, software       |
 | distributed under the License is distributed on an "AS IS" BASIS,         |
 | WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  |
 | See the License for the specific language governing permissions and       |
 |  limitations under the License.                                           |
 ----------------------------------------------------------------------------

 21 October 2020

*/

export function load() {

  let componentName = 'conduit-signup';

  customElements.define(componentName, class conduit_signup extends HTMLElement {
    constructor() {
      super();

      const html = `
<div class="auth-page">
  <div class="container page">
    <div class="row">
      <div class="col-md-6 offset-md-3 col-xs-12">
        <h1 class="text-xs-center">Sign Up</h1>
        <p class="text-xs-center">
          <a href="#">Have an account?</a>
        </p>
        <ul class="error-messages"></ul>
        <form>
          <fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="text" placeholder="Username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">Sign In</button>
          </fieldset>
        </form>
      </div>
    </div>
  </div>
</div>
      `;

      this.html = `${html}`;
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.root) {
        this.root = state.root;
        state.root.login_page = this;
      }
    }

    addError(text) {
      let el = document.createElement('li');
      el.textContent = text;
      this.errorsEl.appendChild(el);
    }

    onSelected() {
      this.errorsEl.textContent = '';
      this.username.value = '';
      this.email.value = '';
      this.password.value = '';
    }

    onLoaded() {
      this.errorsEl.textContent = '';
      let _this = this;
      let fn = async function(e) {
        e.preventDefault();
        _this.errorsEl.textContent = '';
        let response = await _this.root.apis.registerUser(_this.username.value, _this.email.value, _this.password.value);
        //console.log(response);
        if (response.errors) {
          for (let type in response.errors) {
            response.errors[type].forEach(function(text) {
              let error = type + ' ' + text;
              _this.addError(error);
            });
          }
        }
        else {
          if (response.user.image === '') response.user.image = _this.context.defaultImage || '';
          _this.context.user = response.user;
          let jwt = response.user.token;
          _this.context.jwt = jwt;
          localStorage.setItem('conduit-jwt', jwt);
          if (_this.context.return_to) {
            _this.root.showLoggedInOptions();
            _this.root.switchToPage(_this.context.return_to);
          }
          else {
            _this.root.switchToPage('home_page');
          }
        }
      };
      this.addHandler(fn, this.form, 'submit');

      let fn2 = function() {
        _this.root.switchToPage('login');
      };
      this.addHandler(fn2, this.haveAccountLink);

    }

    connectedCallback() {
      this.innerHTML = this.html;
      this.rootElement = this.getElementsByTagName('div')[0];
      this.haveAccountLink = this.rootElement.querySelector('a');
      this.errorsEl = this.rootElement.querySelector('.error-messages');
      this.loginBtn = this.rootElement.querySelector('button');
      let inputs = this.rootElement.getElementsByTagName('input');
      this.username = inputs[0];
      this.email = inputs[1];
      this.password = inputs[2];
      let form = this.rootElement.getElementsByTagName('form');
    }

    disconnectedCallback() {
      //console.log('*** signup component was removed!');
      if (this.onUnload) this.onUnload();
    }
  });
}
