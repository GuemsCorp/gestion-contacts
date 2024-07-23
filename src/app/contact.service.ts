import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Contact } from '../models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = [];

  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    await this.storage.create();
    this.contacts = (await this.storage.get('contacts')) || [];
  }

  async getContacts(): Promise<Contact[]> {
    return this.contacts;
  }

  async addContact(contact: Contact): Promise<void> {
    this.contacts.push(contact);
    await this.storage.set('contacts', this.contacts);
  }

  async getContactById(id: number): Promise<Contact | undefined> {
    return this.contacts.find(contact => contact.id === id);
  }

  async deleteContact(id: number): Promise<void> {
    this.contacts = this.contacts.filter(contact => contact.id !== id);
    await this.storage.set('contacts', this.contacts);
  }
}
