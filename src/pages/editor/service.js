import { fetch, lang } from 'common/js/Utils'
import configService from '../../layout/admin/service'

export default {
  getRenderDataSync (params) {
    return lang[params.page]
  },
  getRenderData (params) {
    return configService.getConfig().then(({data: {text}}) => {
      return Object.assign(lang[params.page], text[params.page])
    })
  },
  saveEnable (params, url = '/api/page/edit') {
    return fetch(url, params)
  },
  getAuditInfo (page, url = '/api/page/detail') {
    return fetch(url, {pid: page})
  }
}
