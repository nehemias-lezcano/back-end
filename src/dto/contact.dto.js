class ContactDto {
    constructor(contact){
        this.first_name = contact?.name || '';
        this.last_name  = contact?.last_name || '';
        this.active = true
        this.phone = contact?.phone ? contact.phone.split('-').join('') : ''
    }
}

export default ContactDto

//2964-4933910