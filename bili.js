import { writeFile } from 'node:fs/promises'
// 分页抓取热门视频，直到没有更多
let pn = 1, all = []
for (;;) {
  const j = await (await fetch(`https://api.bilibili.com/x/web-interface/popular?pn=${pn}&ps=20`)).json()
  all.push(...j.data.list.map(item => item.bvid))
  if (j.data.no_more) break
  pn++
}
await writeFile('dist/bvids.json', JSON.stringify(all))