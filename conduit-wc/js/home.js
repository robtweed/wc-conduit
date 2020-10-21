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

export function home_page_assembly() {

  let component = {
    componentName: 'conduit-content-page',
    state: {
      name: 'home_page'
    },
    children: [
      {
        componentName: 'conduit-home-page',
        hooks: ['initialise']
      }
    ]
  };

  
  let hooks = {
    'conduit-home-page': {
      initialise: async function() {

        // set up links between components

        let contentPage = this.getParentComponent('conduit-content-page');
        contentPage.childComponent = this;

        this.setState({
          root: this.context.root
        });

        async function hang(time) {
          return new Promise((resolve) => {
            setTimeout(function() {
              resolve();
            }, time);
          });
        }

        async function jwt_decode_ready() {
          if (typeof jwt_decode === 'undefined') {
            //console.log('wait for 10');
            await hang(10);
            await jwt_decode_ready();
          }
          return;
        }

        //console.log('wait till jwt_decode is available');
        await jwt_decode_ready();
        //console.log('its ready!');

        // retrieve JWT if present

        let jwt = localStorage.getItem('conduit-jwt');
        if (jwt) {
          let jwt_dec = jwt_decode(jwt);
          let exp = jwt_dec.exp * 1000;
          if (exp < Date.now()) {
            // JWT has expired, so get rid of it
            jwt = null;
            localStorage.removeItem('conduit-jwt');
            this.onSelected();
          }
          else {
            this.context.jwt = jwt;
            //fetch user data and establish user context
            let results = await this.root.apis.getUser();
            this.context.user = results.user;
            this.onSelected();
          }
        }
        else {
          this.onSelected();
        }
      }
    }
  };

  return {component, hooks};
};

