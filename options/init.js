/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

function resetCount() {
  browser.runtime.sendMessage({ type: 'reset' });
}

window.addEventListener('DOMContentLoaded', () => {
  const resetCountButton = document.getElementById('resetCount');
  resetCountButton.addEventListener('keypress', aEvent => {
    if (aEvent.key == 'Enter')
      resetCount();
  });
  resetCountButton.addEventListener('click', aEvent => {
    if (aEvent.button == 0)
      resetCount();
  });
}, { once: true });

