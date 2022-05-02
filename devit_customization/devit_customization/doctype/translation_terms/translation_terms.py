# Copyright (c) 2022, Hardik and contributors
# For license information, please see license.txt

import frappe
import os
import csv
from frappe.model.document import Document

class TranslationTerms(Document):

    def after_rename(self, olddn, newdn, merge=False):
        if self.field_ref:
            term = frappe.get_doc("DocField", self.field_ref)
        elif self.custom_field_ref:
            term = frappe.get_doc("Custom Field", self.custom_field_ref)
        if term:
            term.update({'label': newdn})
            term.save()

    def on_update(self):
        if self.field_de_term or self.field_it_term:
            self.update_csv()
        self.update_mandatory()

    def on_trash(self):
        self.update_csv(True)
    
    def update_csv(self, is_delete=False):
        obj = {}
        if self.field_de_term:
            obj.update({'de': {'source_text': self.source_text, 'translated_text': self.field_de_term}})
            translation_id = frappe.get_list('Translation', filters={'language': 'de', 'source_text': self.source_text})
            if translation_id:
                create_or_update_translation({'translated_text': self.field_de_term, 'source_text': self.source_text, 'language': 'de'}, is_update=True)
            else:
                create_or_update_translation({'translated_text': self.field_de_term, 'source_text': self.source_text, 'language': 'de'}, is_update=False)
        if self.field_it_term:
            obj.update({'it': {'source_text': self.source_text, 'translated_text': self.field_it_term}})
            translation_id = frappe.get_list('Translation', filters={'language': 'it', 'source_text': self.source_text})
            if translation_id:
                create_or_update_translation({'translated_text': self.field_it_term, 'source_text': self.source_text, 'language': 'it'}, is_update=True)
            else:
                create_or_update_translation({'translated_text': self.field_it_term, 'source_text': self.source_text, 'language': 'it'}, is_update=False)
        update_csv_file(obj, is_delete)

    def update_mandatory(self):
        term = False
        if self.custom_field_ref:
            term = frappe.get_doc("Custom Field", self.custom_field_ref)
        elif self.field_ref:
            term = frappe.get_doc("DocField", self.field_ref)
        if term:
            term.update({'reqd': self.mandatory})
            term.save()

def create_or_update_translation(data, is_update):
    source_text = data.get('source_text')
    translated_text = data.get('translated_text')
    language = data.get('language')
    if is_update:
        frappe.db.sql(""" UPDATE `tabTranslation` SET translated_text='%s' WHERE source_text='%s' AND language='%s'; """%(translated_text, source_text, language))
    else:
        translation = frappe.new_doc('Translation')
        translation.update({'language': language, 'source_text': source_text, 'translated_text': translated_text})
        translation.save()


def update_csv_file(obj, is_delete=False):
    app_path = frappe.get_app_path('devit_customization')
    for k, v in obj.items():
        file_path = os.path.join(app_path, 'translations', f"{k}.csv")
        file = open(file_path)
        csvreader = csv.reader(file)
        rows = []
        update_csv = True if not is_delete else False
        add_row = True if not is_delete else False
        for row in csvreader:
            delete_row = False
            if row[0] == v['source_text'] and row[1] == v['translated_text']:
                if is_delete:
                    update_csv = True
                    delete_row = True
                else:
                    update_csv = False
                    break
            if row[0] == v['source_text'] and not is_delete:
                row[1] = v['translated_text']
                add_row = False
            if is_delete and delete_row:
                continue
            rows.append(row)
        file.close()
        if update_csv:
            if add_row:
                rows.append([v['source_text'], v['translated_text'], ''])
            write_file(file_path, rows)

def write_file(filepath, rows):
    with open(filepath, 'w') as csvfile:
        csvwriter = csv.writer(csvfile)
        csvwriter.writerows(rows)

@frappe.whitelist()
def update_all_modules():
    frappe.enqueue(update_module_terms, timeout=40000)

def update_module_terms():
    frappe.db.auto_commit_on_many_writes = 1
    field_ref_terms = frappe.db.sql_list('''SELECT field_ref from `tabTranslation Terms`''')
    custom_field_ref_terms = frappe.db.sql_list('''SELECT custom_field_ref from `tabTranslation Terms`''')
    fields = frappe.db.sql(''' SELECT name, parent, trim(label) as label, reqd from `tabDocField` WHERE trim(label) is not null AND trim(label) <> "" order by idx ''', as_dict=1)
    for field in fields:
        dt_list = frappe.db.sql('''SELECT name, module from `tabDocType` WHERE name = %(name)s order by name''', {'name': field.parent}, as_dict=1)
        if not dt_list:
            dt_list = {'name': '', 'module': ''}
        else:
            dt_list = dt_list[0]
        new_term = frappe.get_doc({
            'doctype': 'Translation Terms',
            'module_name': dt_list.module,
            'sub_module': dt_list.name,
            'source_text': field.label,
            'mandatory': field.reqd,
            'field_ref': field.name,
            'is_custom_field': False
        })
        new_term.insert(ignore_if_duplicate=True)
        field_ref_terms.append(field.name)
    fields = frappe.db.sql(''' SELECT name, dt, trim(label) as label, reqd from `tabCustom Field` WHERE trim(label) is not null AND trim(label) <> "" order by idx ''', as_dict=1)
    for field in fields:
        dt_list = frappe.db.sql('''SELECT name, module from `tabDocType` WHERE name = %(name)s order by name''', {'name': field.dt}, as_dict=1)
        if not dt_list:
            dt_list = {'name': '', 'module': ''}
        else:
            dt_list = dt_list[0]
        new_term = frappe.get_doc({
            'doctype': 'Translation Terms',
            'module_name': dt_list.module,
            'sub_module': field.dt,
            'source_text': field.label,
            'mandatory': field.reqd,
            'custom_field_ref': field.name,
            'is_custom_field': True
        })
        new_term.insert(ignore_if_duplicate=True)
        custom_field_ref_terms.append(field.name)
    frappe.db.auto_commit_on_many_writes = 0
