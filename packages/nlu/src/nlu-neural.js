/*
 * Copyright (c) AXA Group Operations Spain S.A.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const { NeuralNetwork } = require('@nlpjs/neural');
const Nlu = require('./nlu');

class NeuralNlu extends Nlu {
  innerTrain(srcInput) {
    const input = srcInput;
    this.neuralNetwork = new NeuralNetwork(input.settings, this.container);
    input.status = this.neuralNetwork.train(input.corpus);
    return input;
  }

  innerProcess(srcInput) {
    const input = srcInput;
    if (!this.neuralNetwork) {
      input.classifications = { None: 1 };
    } else {
      input.classifications = this.neuralNetwork.run(input.tokens);
    }
    return input;
  }

  registerDefault() {
    super.registerDefault();
    this.container.register('NeuralNlu', NeuralNlu, false);
  }
}

module.exports = NeuralNlu;
