import { atom, selector } from 'recoil';

const _TEST_DEFAULT_LIST = [
  {
    id: 1,
    text: '示例TODO, 可直接删除AAAAAAAAA',
    completed: false
  },
  {
    id: 2,
    text: '示例TODO, 可直接删除BBBBBBBBBBBBBBBBBBBB',
    completed: false
  },
  {
    id: 3,
    text: 'CCCCCCCCCCC',
    completed: false
  },
  {
    id: 4,
    text: '示例TODO, 可直接删除DDDDDDDDDDDDDDDDDD',
    completed: false
  },
  {
    id: 5,
    text: '示例TODO, 可直接删除FFFFFFFFFFFFFFF',
    completed: false
  },
  {
    id: 6,
    text: '示例TODO, 可直接删除EEEEEEEEEEEEEEEEEEEEEEEEEE',
    completed: false
  }
]

export const todoFilterAtom = atom({
  key: 'todoFilterAtom',
  default: 'ALL', // ALL COMPLETED ACTIVE
});

export const todoListAtom = atom({
  key: 'todoListAtom',
  default: _TEST_DEFAULT_LIST
});

export const todoFilterSelector = selector({
  key: 'todoFilterSelector',
  get: ({ get }) => {
    const list = get(todoListAtom);
    const filter = get(todoFilterAtom);
    switch (filter) {
      case 'COMPLETED':
        return list.filter(item => item.completed);
      case 'ACTIVE':
        return list.filter(item => !item.completed);
      default:
        return list;
    }
  }
})

export const todoStatsSelector = selector({
  key: 'todoStatsSelector',
  get: ({ get }) => {
    const list = get(todoListAtom);
    return [
      {
        filter: 'ALL',
        name: 'ALL',
        count: list.length
      },
      {
        filter: 'ACTIVE',
        name: 'ACTIVE',
        count: list.filter(item => !item.completed).length
      },
      {
        filter: 'COMPLETED',
        name: 'COMPLETED',
        count: list.filter(item => item.completed).length
      },
    ]
  }
})
