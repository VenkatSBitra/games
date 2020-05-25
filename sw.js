let cacheName = 'game_files'

let filesToCache = [
  '/',
  './index.html',
  './phaser.min.js',
  './15Puzzle/assets/1.png',
  './15Puzzle/assets/2.png',
  './15Puzzle/assets/3.png',
  './15Puzzle/assets/4.png',
  './15Puzzle/assets/5.png',
  './15Puzzle/assets/6.png',
  './15Puzzle/assets/7.png',
  './15Puzzle/assets/8.png',
  './15Puzzle/assets/9.png',
  './15Puzzle/assets/10.png',
  './15Puzzle/assets/11.png',
  './15Puzzle/assets/12.png',
  './15Puzzle/assets/13.png',
  './15Puzzle/assets/14.png',
  './15Puzzle/assets/15.png',
  './15Puzzle/assets/16.png',
  './15Puzzle/assets/17.png',
  './15Puzzle/assets/18.png',
  './15Puzzle/assets/19.png',
  './15Puzzle/assets/20.png',
  './15Puzzle/assets/21.png',
  './15Puzzle/assets/22.png',
  './15Puzzle/assets/23.png',
  './15Puzzle/assets/24.png',
  './15Puzzle/assets/25.png',
  './15Puzzle/assets/26.png',
  './15Puzzle/assets/27.png',
  './15Puzzle/assets/28.png',
  './15Puzzle/assets/29.png',
  './15Puzzle/assets/30.png',
  './15Puzzle/assets/31.png',
  './15Puzzle/assets/32.png',
  './15Puzzle/assets/33.png',
  './15Puzzle/assets/34.png',
  './15Puzzle/assets/35.png',
  './15Puzzle/file.html',
  './15Puzzle/game.js',
  './15Puzzle/Play.js',
  './15Puzzle/Start.js',
  './15PuzzleCanvas/file.html',
  './15PuzzleCanvas/canvas.js'
]

self.addEventListener('install', function (event) {
  console.log('sw install')
  event.waitUntil(
    caches.open(cacheName).then(function (cache) {
      console.log('sw caching files')
      return cache.addAll(filesToCache)
    }).catch(function (err) {
      console.log(err)
    })
  )
})

self.addEventListener('fetch', (event) => {
  console.log('sw fetch')
  console.log(event.request.url)
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request)
    }).catch(function (error) {
      console.log(error)
    })
  )
})

self.addEventListener('activate', function(event) {
  console.log('sw activate')
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('sw removing old cache', key)
          return caches.delete(key)
        }
      }))
    })
  )
})
