export const _connections = {
  _log_in: '/user/log-in',
  _sign_up: '/user/create-user',
  _fetch_folders: '/folder/get-folders',
  _mail_as_sender: '/email/sender-emails',
  _mail_as_inbox: '/email/inbox-emails',
  _mail_as_trash: '',
  _mail_as_archive: '',
  _mail_as_draft: '',
  _compose_mail: '/email/compose-email',
};

export const _drop_down_values = {
  _menu: [
    { id: 1, name: 'Inbox' },
    { id: 2, name: 'Sent' },
    { id: 3, name: 'Drafts' },
    { id: 4, name: 'Spam' },
    { id: 5, name: 'Trash' },
  ],
};

export const _default_values = {
  _default_active_menu: 'Inbox',
  _user_default_image: 'https://randomuser.me/api/portraits/women/24.jpg',
  _log_image:
    'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
};
