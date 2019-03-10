const mime = require('mime')
const filesystem = require('../filesystem')

jest.mock('mime')

test('should get right mime type for HTML files', () => {
  const indexFilePath = '/home/index.html'
  const htmlMimeType = 'text/html'

  mime.getType.mockReturnValue(htmlMimeType)
  const mimeType = filesystem.getMimeType(indexFilePath)

  expect(mimeType).toEqual(htmlMimeType)
})