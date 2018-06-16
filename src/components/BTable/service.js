import { fetch } from 'common/js/Utils'

var mock = {
  '/api/applyList': {
    detail: [
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '处理中'
      },
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '处理中'
      },
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '成功'
      },
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '失败'
      },
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '处理中'
      },
      {
        workflow: '申请零花钱',
        cTime: '2010-1-2',
        auditor: '妈妈',
        status: '处理中'
      }
    ],
    total_num: 100
  },
  '/api/auditList': {
    detail: [
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        cTime: '2010-1-2',
        auditor: '妈妈',
        nextAuditor: '爸爸'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        cTime: '2010-1-2',
        auditor: '妈妈',
        nextAuditor: '爸爸'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        cTime: '2010-1-2',
        auditor: '妈妈',
        nextAuditor: '爸爸'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        cTime: '2010-1-2',
        auditor: '妈妈',
        nextAuditor: '爸爸'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        cTime: '2010-1-2',
        auditor: '妈妈',
        nextAuditor: '爸爸'
      }
    ],
    total_num: 100
  },
  '/api/auditHistoryList': {
    detail: [
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        auditor: '妈妈,爸爸',
        status: '成功',
        cTime: '2010-1-2',
        endTime: '2010-1-2'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        auditor: '妈妈,爸爸',
        status: '失败',
        cTime: '2010-1-2',
        endTime: '2010-1-2'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        auditor: '妈妈,爸爸',
        status: '成功',
        cTime: '2010-1-2',
        endTime: '2010-1-2'
      },
      {
        workflow: '申请零花钱',
        applicant: '儿子',
        auditor: '妈妈,爸爸',
        status: '成功',
        cTime: '2010-1-2',
        endTime: '2010-1-2'
      }
    ],
    total_num: 100
  }
}

export default {
  getData (url, params = {}) {
    if (Object.keys(mock).includes(url)) {
      return Promise.resolve(mock[url])
    }
    return fetch(url, params)
  }
}
