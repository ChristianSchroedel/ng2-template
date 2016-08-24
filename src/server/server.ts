'use strict';

import * as express from 'express';
import * as path from 'path';

const PORT: number = 5555;

let app = express();

app.use('/', express.static(path.resolve(__dirname, '../client')));

app.listen(PORT, () => {
  console.log('app listening on port: ' + PORT);
});
