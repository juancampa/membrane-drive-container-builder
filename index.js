import { get, post } from './client'

const { root } = program.refs
const { PROJECT_ID } = process.env

export async function init() {
  await root.set({
    builds: {},
  })
}

export const BuildCollection = {
  async one({ args }) {
    const { id } = args
    const result = await get(`/v1/projects/${PROJECT_ID}/builds/${id}/`)
    return result
  },
  async page({ args }) {
    const options = {}
    const params = ['pageSize', 'pageToken', 'filter']
    for (let param of params) {
      if (args[param] !== undefined) {
        options[param] = args[param]
      }
    }
    if (args.pageSize !== undefined) {
      options.maxResults = args.pageSize
    }
    const result = await get(`/v1/projects/${PROJECT_ID}/builds/`, options)
    return result
  },
}

export let BuildPage = {
  next({ self, source }) {
    if (source.nextPageToken === undefined) {
      return null
    }
    const args = self.match(root.builds.page())
    return root.builds.page({ ...args, pageToken: source.nextPageToken })
  },
  items({ source }) {
    return source.builds
  },
}

export let BuildItem = {
  self({ source }) {
    const { id } = source
    if (id === undefined || id === null) {
      return null
    }
    return root.builds.one({ id })
  },
}

export let Build = {
  self({ source }) {
    const { id } = source
    if (id === undefined || id === null) {
      return null
    }
    return root.messages.one({ id })
  },
}

export let Images = {
  self({ source }) {
    const { id } = source
    if (id === undefined || id === null) {
      return null
    }
    return root.messages.one({ id })
  },
}

export let Timing = {
  fetchSource({ source }) {
    return source['FETCHSOURCE']
  },
  build({ source }) {
    return source['BUILD']
  },
  push({ source }) {
    return source['PUSH']
  },
}

// export async function update() {
//   // Called when the program is updated from a previous version
// }

// export async function timer({ key }) {
//   // Called every time a timer fires
// }
