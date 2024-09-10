<script setup>
import {nextTick, onMounted, ref} from 'vue';
import { Graph } from '@antv/g6';
import _ from 'lodash'

const container = ref();
let graph = null;
const mockData = {
  '数组': ['_.chunk', '_.compact', '_.concat', '_.difference', '_.differenceBy', '_.differenceWith', '_.drop', '_.dropRight', '_.dropRightWhile', '_.dropWhile', '_.fill', '_.findIndex', '_.findLastIndex', '_.first -> head', '_.flatten', '_.flattenDeep', '_.flattenDepth', '_.fromPairs', '_.head', '_.indexOf', '_.initial', '_.intersection', '_.intersectionBy', '_.intersectionWith', '_.join', '_.last', '_.lastIndexOf', '_.nth', '_.pull', '_.pullAll', '_.pullAllBy', '_.pullAllWith', '_.pullAt', '_.remove', '_.reverse', '_.slice', '_.sortedIndex', '_.sortedIndexBy', '_.sortedIndexOf', '_.sortedLastIndex', '_.sortedLastIndexBy', '_.sortedLastIndexOf', '_.sortedUniq', '_.sortedUniqBy', '_.tail', '_.take', '_.takeRight', '_.takeRightWhile', '_.takeWhile', '_.union', '_.unionBy', '_.unionWith', '_.uniq', '_.uniqBy', '_.uniqWith', '_.unzip', '_.unzipWith', '_.without', '_.xor', '_.xorBy', '_.xorWith', '_.zip', '_.zipObject', '_.zipObjectDeep', '_.zipWith'], 
  '集合': ['_.countBy', '_.each -> forEach', '_.eachRight -> forEachRight', '_.every', '_.filter', '_.find', '_.findLast', '_.flatMap', '_.flatMapDeep', '_.flatMapDepth', '_.forEach', '_.forEachRight', '_.groupBy', '_.includes', '_.invokeMap', '_.keyBy', '_.map', '_.orderBy', '_.partition', '_.reduce', '_.reduceRight', '_.reject', '_.sample', '_.sampleSize', '_.shuffle', '_.size', '_.some', '_.sortBy'], 
  '函数': ['_.after', '_.ary', '_.before', '_.bind', '_.bindKey', '_.curry', '_.curryRight', '_.debounce', '_.defer', '_.delay', '_.flip', '_.memoize', '_.negate', '_.once', '_.overArgs', '_.partial', '_.partialRight', '_.rearg', '_.rest', '_.spread', '_.throttle', '_.unary', '_.wrap'], 
  '语言': ['_.castArray', '_.clone', '_.cloneDeep', '_.cloneDeepWith', '_.cloneWith', '_.conformsTo', '_.eq', '_.gt', '_.gte', '_.isArguments', '_.isArray', '_.isArrayBuffer', '_.isArrayLike', '_.isArrayLikeObject', '_.isBoolean', '_.isBuffer', '_.isDate', '_.isElement', '_.isEmpty', '_.isEqual', '_.isEqualWith', '_.isError', '_.isFinite', '_.isFunction', '_.isInteger', '_.isLength', '_.isMap', '_.isMatch', '_.isMatchWith', '_.isNaN', '_.isNative', '_.isNil', '_.isNull', '_.isNumber', '_.isObject', '_.isObjectLike', '_.isPlainObject', '_.isRegExp', '_.isSafeInteger', '_.isSet', '_.isString', '_.isSymbol', '_.isTypedArray', '_.isUndefined', '_.isWeakMap', '_.isWeakSet', '_.lt', '_.lte', '_.toArray', '_.toFinite', '_.toInteger', '_.toLength', '_.toNumber', '_.toPlainObject', '_.toSafeInteger', '_.toString'], 
  '数学': ['_.add', '_.ceil', '_.divide', '_.floor', '_.max', '_.maxBy', '_.mean', '_.meanBy', '_.min', '_.minBy', '_.multiply', '_.round', '_.subtract', '_.sum', '_.sumBy'],
  '数字': ['_.clamp', '_.inRange', '_.random'], 
  '对象': ['_.assign', '_.assignIn', '_.assignInWith', '_.assignWith', '_.at', '_.create', '_.defaults', '_.defaultsDeep', '_.entries -> toPairs', '_.entriesIn -> toPairsIn', '_.extend -> assignIn', '_.extendWith -> assignInWith', '_.findKey', '_.findLastKey', '_.forIn', '_.forInRight', '_.forOwn', '_.forOwnRight', '_.functions', '_.functionsIn', '_.get', '_.has', '_.hasIn', '_.invert', '_.invertBy', '_.invoke', '_.keys', '_.keysIn', '_.mapKeys', '_.mapValues', '_.merge', '_.mergeWith', '_.omit', '_.omitBy', '_.pick', '_.pickBy', '_.result', '_.set', '_.setWith', '_.toPairs', '_.toPairsIn', '_.transform', '_.unset', '_.update', '_.updateWith', '_.values', '_.valuesIn'], 
  'Seq': ['_', '_.chain', '_.tap', '_.thru', '_.prototype[Symbol.iterator]', '_.prototype.at', '_.prototype.chain', '_.prototype.commit', '_.prototype.next', '_.prototype.plant', '_.prototype.reverse', '_.prototype.toJSON -> value', '_.prototype.value', '_.prototype.valueOf -> value'], 
  '字符串': ['_.camelCase', '_.capitalize', '_.deburr', '_.endsWith', '_.escape', '_.escapeRegExp', '_.kebabCase', '_.lowerCase', '_.lowerFirst', '_.pad', '_.padEnd', '_.padStart', '_.parseInt', '_.repeat', '_.replace', '_.snakeCase', '_.split', '_.startCase', '_.startsWith', '_.template', '_.toLower', '_.toUpper', '_.trim', '_.trimEnd', '_.trimStart', '_.truncate', '_.unescape', '_.upperCase', '_.upperFirst', '_.words'], 
  '实用函数': ['_.attempt', '_.bindAll', '_.cond', '_.conforms', '_.constant', '_.defaultTo', '_.flow', '_.flowRight', '_.identity', '_.iteratee', '_.matches', '_.matchesProperty', '_.method', '_.methodOf', '_.mixin', '_.noConflict', '_.noop', '_.nthArg', '_.over', '_.overEvery', '_.overSome', '_.property', '_.propertyOf', '_.range', '_.rangeRight', '_.runInContext', '_.stubArray', '_.stubFalse', '_.stubObject', '_.stubString', '_.stubTrue', '_.times', '_.toPath', '_.uniqueId'], 
  'Properties': ['_.VERSION', '_.templateSettings', '_.templateSettings.escape', '_.templateSettings.evaluate', '_.templateSettings.imports', '_.templateSettings.interpolate', '_.templateSettings.variable'], 
  'Methods': ['_.templateSettings.imports._'], 
}

// var users = {
//   'fred':    { 'user': 'anxp1', keys: 1, 'age': 40 },
//   'pebbles': { 'user': 'anxp', keys: 2, 'age': 1 }
// };

// const a = _.mapValues(users, 'age');
// console.log(a, 111)

// _({ 'a': 1, 'b': 2 }).forEach( function(value, key) {
//   console.log(key);
// });
// console.log(_({ 'a': 1, 'b': 2 }))

const tooltip = {
  // 数组
  '_.uniq': '数组去重'

}

const val = _.find([2,3,4], [2]);
console.log(val, 123)

const firstData = _.keys(mockData).map((item, index) => {
  return { 
    id: item, 
    nodeType: 'first',
    label: item, 
    isLeaf: true,
  }
})

const secondData = [];
_.keys(mockData).forEach(key => {
  mockData[key].forEach(item => {
    secondData.push({id: item, nodeType: 'second', label: item, parentId: key, isLeaf: true})
  })
});


const data = {
  nodes: [
    { id: 'lodash', nodeType: 'start', label: 'lodash'},
    ...firstData,
    ...secondData
  ],
  edges: [
    ..._.keys(mockData).map(item => ({source: 'lodash',  target: item })),
    ...secondData.map(item => ({source: item.parentId,  target: item.id }))
  ]
}

console.log(data, 123);
const createInstance = () => {
  graph = new Graph({
    container: container.value,
    data,
    layout: {
      type: 'force',
      preventOverlap: true,
      nodeSize: 50,
      nodeSpacing: 10
    },
    node: {
      style: {
        fill: '#EFF4FF',
        lineWidth: 1,
        stroke: '#5F95FF',
      },
    },
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
  });      
}
const nodeAddEvent = () => {
  graph.on('node:click', function (e) {
    const nodeInfo = e.item.getModel();
    if(nodeInfo.nodeType !== 'second') return;
    window.open(`https://www.lodashjs.com/docs/lodash.${nodeInfo.label.replace('_.', '')}`, '_blank')

  });

  graph.on('node:dragstart', (e) => {
    graph.layout();
    refreshDragedNodePosition(e);
  });
  graph.on('node:drag', (e) => {
    refreshDragedNodePosition(e);
  });
}


function refreshDragedNodePosition(e) {
  const model = e.item.get('model');
  model.fx = e.x;
  model.fy = e.y;
}

const init = async () => {
  createInstance();
  await nextTick()
  graph.render();
  nodeAddEvent();
}
onMounted(() => {
  init();
})

</script>
<template>
  <div id="container" ref="container"></div>
</template>

<style lang='scss' scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>