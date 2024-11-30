export const dnsRecords = {
  // SPF Record
  spf: {
    type: 'TXT',
    host: '@',
    value: 'v=spf1 include:mailgun.org ~all',
  },
  // DKIM Record
  dkim: {
    type: 'TXT',
    host: 'email._domainkey',
    value: 'k=rsa; p=YOUR_DKIM_KEY_FROM_MAILGUN',
  },
  // DMARC Record
  dmarc: {
    type: 'TXT',
    host: '_dmarc',
    value: 'v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com',
  },
}; 