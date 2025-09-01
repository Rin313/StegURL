import { writeFile } from 'node:fs/promises'

// 分页抓取热门视频，直到没有更多
let pn = 1, all = []
for (;;) {
  // 获取一页数据
  const j = await (await fetch(`https://api.bilibili.com/x/web-interface/popular?pn=${pn}&ps=20`)).json()
  all.push(...j.data.list.map(item => item.bvid))
  if (j.data.no_more) break
  pn++
}

// 写入合并后的结果
await writeFile('dist/popular.json', JSON.stringify(all))