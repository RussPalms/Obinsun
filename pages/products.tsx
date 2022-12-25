import { NextPage } from 'next';

import * as React from 'react';
import { GetStaticProps } from 'next';
import shuffle from 'lodash.shuffle';
import { PrintfulProduct } from './types';
import ProductGrid from './src/components/ProductIntegration/ProductGrid';
import { formatVariantName } from './server/lib/format-variant-name';
import { printful } from './server/lib/printful-client';
import { getSession } from 'next-auth/react';

type IndexPageProps = {
  products: PrintfulProduct[];
};

function mySet() {
  // the var collection will hold the set
  var collection = [];
  // this method will check for the presence of an element and return true or false
  this.has = function (element) {
    return collection.indexOf(element) !== -1;
  };
  // this method will return all the values in the set
  this.values = function () {
    return collection;
  };
  // this method will add an element to the set
  this.add = function (element) {
    if (!this.has(element)) {
      collection.push(element);
      return true;
    }
    return false;
  };
  // this method will remove an element from a set
  this.remove = function (element) {
    if (this.has(element)) {
      if (this.has(element)) {
        let index = collection.indexOf(element);
        collection.splice(index, 1);
        return true;
      }
      return false;
    }
  };
  // this method will return the size of the collection
  this.size = function () {
    return collection.length;
  };
  // this method will return the union of two sets
  this.union = function (otherSet) {
    var unionSet = new mySet();
    var firstSet = this.values();
    var secondSet = otherSet.values();
    firstSet.forEach(function (e) {
      unionSet.add(e);
    });
    secondSet.forEach(function (e) {
      unionSet.add(e);
    });
    return unionSet;
  };
  // this method will return the intersection of two sets as a new set
  this.intersection = function (otherSet) {
    var intersectionSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(function (e) {
      if (otherSet.has(e)) {
        intersectionSet.add(e);
      }
    });
    return intersectionSet;
  };
  // this method will return the difference of two sets as a new set
  this.difference = function (otherSet) {
    var differenceSet = new mySet();
    var firstSet = this.values();
    firstSet.forEach(function (e) {
      if (!otherSet.has(e)) {
        differenceSet.add(e);
      }
    });
    return differenceSet;
  };
  // this method will test if the set is a subset of a different set
  this.subset = function (otherSet) {
    var firstSet = this.values();
    return firstSet.every(function (value) {
      return otherSet.has(value);
    });
  };
}

let MinHeap = function () {
  let heap = [null];

  this.insert = function (num) {
    heap.push(num);
    if (heap.length > 2) {
      let idx = heap.length - 1;
      while (heap[idx] < heap[Math.floor(idx / 2)]) {
        if (idx >= 1) {
          [heap[Math.floor(idx / 2)], heap[idx]] = [
            heap[idx],
            heap[Math.floor(idx / 2)],
          ];
          if (Math.floor(idx / 2) > 1) {
            idx = Math.floor(idx / 2);
          } else {
            break;
          }
        }
      }
    }
  };

  this.remove = function () {
    let smallest = heap[1];
    if (heap.length > 2) {
      heap[1] = heap[heap.length - 1];
      heap.splice(heap.length - 1);
      if (heap.length == 3) {
        if (heap[1] > heap[2]) {
          [heap[1], heap[2]] = [heap[2], heap[1]];
        }
        return smallest;
      }
      let i = 1;
      let left = 2 * i;
      let right = 2 * i + 1;
      while (heap[i] >= heap[left] || heap[i] >= heap[right]) {
        if (heap[left] < heap[right]) {
          [heap[i], heap[left]] = [heap[left], heap[i]];
          i = 2 * i;
        } else {
          [heap[i], heap[right]] = [heap[right], heap[i]];
          i = 2 * i + 1;
        }
        left = 2 * i;
        right = 2 * i + 1;
        if (heap[left] == undefined || heap[right] == undefined) {
          break;
        }
      }
    } else if (heap.length == 2) {
      heap.splice(1, 1);
    } else {
      return null;
    }
    return smallest;
  };

  this.sort = function () {
    let result = new Array();
    while (heap.length > 1) {
      result.push(this.remove());
    }
    return result;
  };
};

let MaxHeap = function () {
  let heap = [null];

  this.print = () => heap;

  this.insert = function (num) {
    heap.push(num);
    if (heap.length > 2) {
      let idx = heap.length - 1;
      while (heap[idx] > heap[Math.floor(idx / 2)]) {
        if (idx >= 1) {
          [heap[Math.floor(idx / 2)], heap[idx]] = [
            heap[idx],
            heap[Math.floor(idx / 2)],
          ];
          if (Math.floor(idx / 2) > 1) {
            idx = Math.floor(idx / 2);
          } else {
            break;
          }
        }
      }
    }
  };

  this.remove = function () {
    let smallest = heap[1];
    if (heap.length > 2) {
      heap[1] = heap[heap.length - 1];
      heap.splice(heap.length - 1);
      if (heap.length == 3) {
        if (heap[1] < heap[2]) {
          [heap[1], heap[2]] = [heap[2], heap[1]];
        }
        return smallest;
      }
      let i = 1;
      let left = 2 * i;
      let right = 2 * i + 1;
      while (heap[i] <= heap[left] || heap[i] <= heap[right]) {
        if (heap[left] > heap[right]) {
          [heap[i], heap[left]] = [heap[left], heap[i]];
          i = 2 * i;
        } else {
          [heap[i], heap[right]] = [heap[right], heap[i]];
          i = 2 * i + 1;
        }
        left = 2 * i;
        right = 2 * i + 1;
        if (heap[left] == undefined || heap[right] == undefined) {
          break;
        }
      }
    } else if (heap.length == 2) {
      heap.splice(1, 1);
    } else {
      return null;
    }
    return smallest;
  };
};

var hash = (string, max) => {
  var hash = 0;
  for (var i = 0; i < string.length; i++) {
    hash += string.charCodeAt(i);
  }
  return hash % max;
};

let HashTable = function () {
  let storage = [];
  const storageLimit = 4;

  this.print = function () {
    console.log(storage);
  };

  this.add = function (key, value) {
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      storage[index] = [[key, value]];
    } else {
      var inserted = false;
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          storage[index][i][1] = value;
          inserted = true;
        }
      }
      if (inserted === false) {
        storage[index].push([key, value]);
      }
    }
  };

  this.remove = function (key) {
    var index = hash(key, storageLimit);
    if (storage[index].length === 1 && storage[index][0][0] === key) {
      delete storage[index];
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          delete storage[index][i];
        }
      }
    }
  };

  this.lookup = function (key) {
    var index = hash(key, storageLimit);
    if (storage[index] === undefined) {
      return undefined;
    } else {
      for (var i = 0; i < storage[index].length; i++) {
        if (storage[index][i][0] === key) {
          return storage[index][i][1];
        }
      }
    }
  };
};

const IndexPage: React.FC<IndexPageProps> = ({ products }) => (
  <>
    <div className="text-center pb-6 md:pb-12">
      <h1 className="text-xl md:text-3xl lg:text-5xl font-bold">
        All Products
      </h1>
    </div>

    <ProductGrid products={products} />
  </>
);

export const getStaticProps: GetStaticProps = async () => {
  const util = require('util');

  //   const { result: productIds } = await printful.get('products/645', '');
  const { result: productIds } = await printful.get('products/', '');
  //   const { result: productIds } = await printful.get('sync/products', '');

  let productList = [];
  let productHeap = new MinHeap();
  let productHT = new HashTable();
  for (let i in productIds) {
    productHeap.insert(productIds[i].id);

    // let sortedHeap = productHeap.sort()

    // productHT.add(sortedHeap[i], productIds[i].id)
    i += 1;
  }

  console.dir(productHeap.sort(), { maxArrayLength: null });

  //   for (let i in productHeap.sort()) {
  //     productList[i] = productIds
  //   }

  // const allProducts = await Promise.all(
  //   productIds.map(
  //     async ({ id }: any) => await printful.get(`sync/products/${id}`, '')
  //   )
  // );

  //   const allProducts = await Promise.all(
  //     productIds.map(
  //       async ({ id }: any) => await printful.get(`products/${id}`, '')
  //     )
  //   );

  //   console.log(allProducts);

  // console.log(allProducts[0].result);
  // console.log(util.inspect(allProducts[0], { maxArrayLength: null }));
  // console.dir(allProducts, {
  //   depth: null,
  //   colors: true,
  //   maxArrayLength: null,
  // });

  //   const products: PrintfulProduct[] = allProducts.map(
  //     ({ result: { sync_product, sync_variants } }) => ({
  //       ...sync_product,
  //       variants: sync_variants.map(({ name, ...variant }: any) => ({
  //         name: formatVariantName(name),
  //         ...variant,
  //       })),
  //     })
  //   );

  // console.log(products);
  // console.log(products.price);

  return {
    props: {
      //   products: shuffle(products),
    },
  };
};

export default IndexPage;

// export default function IndexPage2() {}
