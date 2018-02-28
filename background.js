/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

const counters = {};

browser.runtime.onMessage.addListener((aMessage, aSender) => {
  switch (aMessage.type) {
    case 'increment':
      const counter = counters[aMessage.eventType] || { success: 0, fail: 0 };
      if (aMessage.success)
        counter.success++;
      else
        counter.fail++;
      counters[aMessage.eventType] = counter;

      const total = counter.success + counter.fail;
      console.log(`${aMessage.eventType}: ${counter.fail} / ${total} (${counter.fail / total * 100}%)`);
      break;

    case 'reset':
      counters = {};
      break;
  }
});
