// import type { NextApiRequest, NextApiResponse } from 'next';
// // const fs = require('fs/promises');
// var fs = require('fs');
// const svgoPkg = require('svgo/package.json');
// import { buffer } from 'micro';
// import { optimize } from 'svgo/dist/svgo.browser.js';
// import { idbKeyval as storage } from 'pages/server/utils/storage.js';
// import Svgo from './svgo.js';

// const svgo = new Svgo();

// type Data = {
//   success: boolean;
//   //   error: string;
//   message: string;
// };

// export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
//   if (req.method !== 'POST') {
//     return;
//   }

//   // state
//   let _inputItem = null;
//   let _cache = new ResultsCache(10);
//   let _latestCompressJobId = 0;
//   let _userHasInteracted = false;
//   let _reloading = false;

//   const getSettings = () => {
//     // fingerprint is used for cache lookups
//     const fingerprint = [];
//     const output = {
//       plugins: {},
//     };

//     for (const inputEl of _globalInputs) {
//       if (inputEl.name !== 'gzip' && inputEl.name !== 'original') {
//         if (inputEl.type === 'checkbox') {
//           fingerprint.push(Number(inputEl.checked));
//         } else {
//           fingerprint.push(`|${inputEl.value}|`);
//         }
//       }

//       output[inputEl.name] =
//         inputEl.type === 'checkbox' ? inputEl.checked : inputEl.value;
//     }

//     for (const inputEl of _pluginInputs) {
//       fingerprint.push(Number(inputEl.checked));
//       output.plugins[inputEl.name] = inputEl.checked;
//     }

//     output.fingerprint = fingerprint.join(',');

//     return output;
//   };

//   const _updateForFile = (svgFile: any, { compareToFile, compress }) => {
//     _outputUi.update(svgFile);
//     // console.log(_outputUi);
//     _downloadButtonUi.setDownload(_inputFilename, svgFile);
//     _copyButtonUi.setCopyText(svgFile.text);

//     _resultsUi.update({
//       comparisonSize: compareToFile && (await compareToFile.size({ compress })),
//       size: await svgFile.size({ compress }),
//     });
//   };

//   const _compressSvg = async (settings: any) => {
//     const thisJobId = (_latestCompressJobId = Math.random());

//     await svgo.abort();

//     if (thisJobId !== _latestCompressJobId) {
//       // while we've been waiting, there's been a newer call
//       // to _compressSvg, we don't need to do anything
//       return;
//     }

//     if (settings.original) {
//       _updateForFile(_inputItem, {
//         compress: settings.gzip,
//       });
//       return;
//     }

//     const cacheMatch = _cache.match(settings.fingerprint);

//     if (cacheMatch) {
//       _updateForFile(cacheMatch, {
//         compareToFile: _inputItem,
//         compress: settings.gzip,
//       });
//       return;
//     }

//     _downloadButtonUi.working();

//     try {
//       const resultFile = await svgo.process(_inputItem.text, settings);

//       _updateForFile(resultFile, {
//         compareToFile: _inputItem,
//         compress: settings.gzip,
//       });

//       _cache.add(settings.fingerprint, resultFile);
//     } catch (error) {
//       if (error.name === 'AbortError') return;
//       error.message = `Minifying error: ${error.message}`;
//       _handleError(error);
//     } finally {
//       _downloadButtonUi.done();
//     }
//   };

//   const _onInputChange = async ({ data, filename }) => {
//     const settings = getSettings();
//     _userHasInteracted = true;

//     try {
//       const _inputItem = await svgo.wrapOriginal(data);
//       const _inputFilename = filename;
//     } catch (error) {
//       // _mainMenuUi.stopSpinner();
//       _handleError(new Error(`Load failed: ${error.message}`));
//       return;
//     }

//     _cache.purge();

//     _compressSvg(settings);
//     // _outputUi.reset();
//     // _mainUi.activate();
//     // _mainMenuUi.allowHide = true;
//     // _mainMenuUi.hide();
//   };

//   const _setSettings = (settings: any) => {
//     for (const inputEl of _globalInputs) {
//       if (!(inputEl.name in settings)) continue;

//       if (inputEl.type === 'checkbox') {
//         inputEl.checked = settings[inputEl.name];
//       } else if (inputEl.type === 'range') {
//         _sliderMap.get(inputEl).value = settings[inputEl.name];
//       }
//     }

//     for (const inputEl of _pluginInputs) {
//       if (!(inputEl.name in settings.plugins)) continue;
//       inputEl.checked = settings.plugins[inputEl.name];
//     }
//   };

//   const _loadSettings = async () => {
//     const settings = await storage.get('settings');
//     if (settings) _setSettings(settings);
//   };

//   _loadSettings();

//   const _saveSettings = (settings: any) => {
//     // doesn't make sense to retain the "show original" option
//     const { original, ...settingsToKeep } = settings;
//     storage.set('settings', settingsToKeep);
//   };

//   const _onSettingsChange = () => {
//     const settings = getSettings();
//     _saveSettings(settings);
//     _compressSvg(settings);
//   };

//   const _onSettingsReset = async (oldSettings: any) => {
//     const toast = _toastsUi.show('Settings reset', {
//       buttons: ['undo', 'dismiss'],
//       duration: 5000,
//     });
//     const answer = await toast.answer;

//     if (answer === 'undo') {
//       _setSettings(oldSettings);
//       _onSettingsChange();
//     }
//   };

//   const createDimensionsExtractor = () => {
//     const dimensions = {};
//     const plugin = {
//       type: 'visitor',
//       name: 'extract-dimensions',
//       fn: () => {
//         return {
//           element: {
//             // Node, parentNode
//             enter: ({ name, attributes }, { type }) => {
//               if (name === 'svg' && type === 'root') {
//                 if (
//                   attributes.width !== undefined &&
//                   attributes.height !== undefined
//                 ) {
//                   dimensions.width = Number.parseFloat(attributes.width);
//                   dimensions.height = Number.parseFloat(attributes.height);
//                 } else if (attributes.viewBox !== undefined) {
//                   const viewBox = attributes.viewBox.split(/,\s*|\s+/);
//                   dimensions.width = Number.parseFloat(viewBox[2]);
//                   dimensions.height = Number.parseFloat(viewBox[3]);
//                 }
//               }
//             },
//           },
//         };
//       },
//     };

//     return [dimensions, plugin];
//   };

//   function compress(svgInput: any, settings: any) {
//     // setup plugin list
//     const floatPrecision = Number(settings.floatPrecision);
//     const plugins = [];

//     for (const [name, active] of Object.entries(settings.plugins)) {
//       if (!active) continue;

//       const plugin = {
//         name,
//         params: {},
//       };

//       // TODO: revisit this
//       // 0 almost always breaks images when used on `cleanupNumericValues`.
//       // Better to allow 0 for everything else, but switch to 1 for this plugin.
//       plugin.params.floatPrecision =
//         plugin.name === 'cleanupNumericValues' && floatPrecision === 0
//           ? 1
//           : floatPrecision;

//       plugins.push(plugin);
//     }

//     // multipass optimization
//     const [dimensions, extractDimensionsPlugin] = createDimensionsExtractor();
//     const { data, error } = optimize(svgInput, {
//       multipass: settings.multipass,
//       plugins: [...plugins, extractDimensionsPlugin],
//       js2svg: {
//         indent: '  ',
//         pretty: settings.pretty,
//       },
//     });

//     if (error) throw new Error(error);

//     return { data, dimensions };
//   }

//   const actions = {
//     wrapOriginal({ data }) {
//       const [dimensions, extractDimensionsPlugin] = createDimensionsExtractor();
//       const { error } = optimize(data, {
//         plugins: [extractDimensionsPlugin],
//       });

//       if (error) throw new Error(error);

//       return dimensions;
//     },
//     process({ data, settings }) {
//       return compress(data, settings);
//     },
//   };

//   self.onmessage = (event: any) => {
//     try {
//       self.postMessage({
//         id: event.data.id,
//         result: actions[event.data.action](event.data),
//       });
//     } catch (error) {
//       self.postMessage({
//         id: event.data.id,
//         error: error.message,
//       });
//     }
//   };

//   //   const requestBuffer = await buffer(req);
//   //   const payload = requestBuffer.toString();

//   //   console.log(requestBuffer);

//   const svgData = req.body;

//   //   console.log(svgData.toString());

//   const { filePath } = svgData;

//   console.log(filePath);

//   //   const svgList = [];

//   //   fs.readFile(filePath, 'utf8', function (err, contents) {
//   //     const end_tokens = contents.split('</Svg>');
//   //     end_tokens.map((token) => {
//   //       svgList.push(token.split('<Svg ')[1]);
//   //     });

//   //     //recreate file
//   //     svgList.map((svg, index) => {
//   //       if (svg) {
//   //         const filename = 'svg' + index + '.svg';
//   //         fs.writeFile(filename, '<Svg ' + svg + '</Svg>', function (err) {
//   //           if (err) throw err;
//   //           console.log(filename, ' saved!');
//   //         });
//   //       }
//   //     });
//   //   });

//   //   const readJSON = async (filePath) => {
//   //     const content = await fs.readFile(filePath, 'utf-8');
//   //     return JSON.parse(content);
//   //   };

//   //   console.log(await readJSON(filePath));

//   //   res.status(200).json({ success: false, error: 'Cart must not be empty' });
//   res.status(200).json({ success: true, message: 'recieved svg' });
// };

// // export const config = {
// //   api: {
// //     bodyParser: false,
// //     externalResolver: true,
// //   },
// // };

export {};
