// export const domReady = new Promise((resolve: any) => {
//   function checkState() {
//     if (document.readyState !== 'loading') resolve();
//   }

//   document.addEventListener('readystatechange', checkState);
//   checkState();
// });

// const range = document.createRange();
// range.selectNode(document.documentElement);

// export function strToEl(str: any) {
//   return range.createContextualFragment(String(str)).children[0];
// }

// const entityMap: any = {
//   '&': '&amp;',
//   '<': '&lt;',
//   '>': '&gt;',
//   '"': '&quot;',
//   "'": '&#39;',
//   '/': '&#x2F;',
// };

// export function escapeHTML(str: any) {
//   return String(str).replace(/[&<>"'/]/g, (s) => entityMap[s]);
// }

// export function escapeHtmlTag(strings: any, ...values: any[]) {
//   values = values.map((s) => escapeHTML(s));
//   return strings.reduce(
//     (str: any, val: any, i: any) => str + val + (values[i] || ''),
//     ''
//   );
// }

// export function readFileAsText(file: any) {
//   return new Response(file).text();
// }

// function transitionClassFunc({ removeClass = false } = {}) {
//   return (
//     element: any,
//     className = 'active',
//     transitionClass = 'transition'
//   ) => {
//     const hasClass = element.classList.contains(className);

//     if (removeClass) {
//       if (!hasClass) return Promise.resolve();
//     } else if (hasClass) {
//       return Promise.resolve();
//     }

//     const transitionEnd = new Promise((resolve: any) => {
//       const listener = (event: any) => {
//         if (event.target !== element) return;
//         element.removeEventListener('transitionend', listener);
//         element.classList.remove(transitionClass);
//         resolve();
//       };

//       element.classList.add(transitionClass);

//       requestAnimationFrame(() => {
//         element.addEventListener('transitionend', listener);
//         element.classList[removeClass ? 'remove' : 'add'](className);
//       });
//     });

//     const transitionTimeout = new Promise((resolve) => {
//       setTimeout(resolve, 1000);
//     });

//     return Promise.race([transitionEnd, transitionTimeout]);
//   };
// }

// export const transitionToClass = transitionClassFunc();
// export const transitionFromClass = transitionClassFunc({ removeClass: true });

// export function trackFocusMethod() {
//   let focusMethod = 'mouse';

//   document.body.addEventListener(
//     'focus',
//     (event: any) => {
//       event.target.classList.add(
//         focusMethod === 'key' ? 'key-focused' : 'mouse-focused'
//       );
//     },
//     true
//   );

//   document.body.addEventListener(
//     'blur',
//     (event: any) => {
//       event.target.classList.remove('key-focused', 'mouse-focused');
//     },
//     true
//   );

//   document.body.addEventListener(
//     'keydown',
//     () => {
//       focusMethod = 'key';
//     },
//     true
//   );

//   document.body.addEventListener(
//     'mousedown',
//     () => {
//       focusMethod = 'mouse';
//     },
//     true
//   );
// }

export default {};
