cyFAIRhackTesting
==================

This cyFAIRevaulator is based on `Cypress testing framework <https://www.cypress.io/>`_ which is
fast, easy and reliable testing for anything that runs in a browser. To complete end-to-end testing experience and
combines tests on HTTP header as well in the HTTP body.

The code is developed thru the `Apples-to-Apples Workshop <https://github.com/markwilkinson/Apples-to-Apples-FAIR-Metrics>`_ which takes place
on Monday, March 21.th 2022.



How to start
~~~~~~~~~~~~

Required is a installation of CypressIO testing framework. On linux you can run the command:

``npm install cypress`` or take a look at `CypressIO website <https://cypress.io/>`_

Then, make a change of the directory to this project and run the command

``./node_modules/.bin/cypress open``

Select 'sample_spec.js' file and as default, a exists of records from `PANGAEA <https://pangaea.de>`_ and 
from `Bielefeld University Library Repository <https://pub.uni-bielefeld.de>`_ will be checked.
Afterwards, the records will be evaluate of existing attributes from `Signposting FAIR <https://signposting.org/FAIR/>`_ profile.

