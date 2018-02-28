/*
# This Source Code Form is subject to the terms of the Mozilla Public
# License, v. 2.0. If a copy of the MPL was not distributed with this
# file, You can obtain one at http://mozilla.org/MPL/2.0/.
*/
'use strict';

const DELAY_MSEC = 100;
const TIMEOUT_MSEC = 5000;

function checkTimeout(aEvent) {
  if (!aEvent.target.closest('input, textarea, [contenteditable="true"]'))
    return;

  const startAt = Date.now();
  setTimeout(() => {
    browser.runtime.sendMessage({
      type:      'increment',
      eventType: aEvent.type,
      success: Date.now() - startAt < TIMEOUT_MSEC
    });
  }, DELAY_MSEC);
}

window.addEventListener('keydown', checkTimeout, true);
window.addEventListener('keyup', checkTimeout, true);
window.addEventListener('keypress', checkTimeout, true);
window.addEventListener('input', checkTimeout, true);
