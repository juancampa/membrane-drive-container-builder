const { schema, imports, dependencies, environment, expressions, endpoints, tests } = program;

tests
  .add('access', 'The driver can access the Google Container Builder API and retrieve data')

environment
  .add('API_TOKEN', 'The API TOKEN')
  .add('PROJECT_ID', 'The Project Id')

schema.type('Root')
  .field('builds', 'BuildCollection')

schema.type('BuildCollection')
  .computed('one', 'Build')
    .param('id', 'String', 'Unique identifier of the build.')
  .computed('page', 'BuildPage')
    .param('pageSize', 'Int', 'The standard list page size.')
    .param('pageToken', 'String', 'The standard list page token.')
    .param('filter', 'String', 'The standard list filter.')

schema.type('BuildPage')
  .computed('items', '[BuildItem]')
  .computed('next', 'BuildPage*')

schema.type('BuildItem')
  .field('id', 'String', 'Unique identifier of the build.')
  .computed('self', 'Build*')

schema.type('Build')
  .computed('self', 'Build*')
  .field('id', 'String', 'Unique identifier of the build.')
  .field('status', 'String')
  .field('source', 'Source')
  .field('createTime', 'String')
  .field('startTime', 'String')
  .field('finishTime', 'String')
  .field('results', 'Results')
  .field('timeout', 'String')
  .field('images', '[String]')
  .field('projectId', 'String')
  .field('logsBucket', 'String')
  .field('sourceProvenance', 'SourceProvenance')
  .field('buildTriggerId', 'String')
  .field('logUrl', 'String')
  // .field('steps', 'Steps')
  .field('timing', 'Timing')

schema.type('Source')
  .field('repoSource', 'RepoSource')

schema.type('RepoSource')
  .field('projectId', 'String')
  .field('repoName', 'String')
  .field('branchName', 'String')

schema.type('Results')
  .field('images', '[Images]')
  .field('buildStepImages', '[String]')

schema.type('Images')
  .computed('self', 'Images*')
  .field('name', 'String')
  .field('digest', 'String')
  .field('pushTiming', 'PushTiming')

schema.type('PushTiming')
  .field('startTime', 'String')
  .field('endTime', 'String')

schema.type('SourceProvenance')
  .field('resolvedRepoSource', 'ResolvedRepoSource')

schema.type('ResolvedRepoSource')
.field('projectId', 'String')
.field('repoName', 'String')
.field('commitSha', 'String')

schema.type('Timing')
  .computed('fetchSource', 'PushTiming')
  .computed('build', 'PushTiming')
  .computed('push', 'PushTiming')

