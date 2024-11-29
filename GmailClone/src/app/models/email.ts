export class Email {
    subject: string = '';
    body: string = '';
    senderEmail: string = '';
    recipientEmail: string = '';
    sentDate: Date = new Date();
    isRead: boolean = false;
    isStarred: boolean = false;
    isDraft: boolean = false;
    cc: string = '';
    bcc: string = '';
    isArchived: boolean = false;
    updatedAt?: Date | null = null;
    updatedIp?: string = '';
    attachments: EmailAttachmentDto[] = [];
}

export class EmailAttachmentDto {
    fileName: string = '';
    fileSize: number = 0;
    mimeType: string = '';
    filePath: string = '';
    content: Uint8Array = new Uint8Array();
}