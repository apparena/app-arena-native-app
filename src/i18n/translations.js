import I18n from "react-native-i18n";

export function registerTranslation() {
    // Enable fallbacks if you want `en-US` and `en-GB` to fallback to `en`
    I18n.fallbacks = true;

    I18n.translations = {
        en: {
            login: 'Login',
            register: 'Register',
            already_account: 'Already an Account?',
            need_account: 'No Account?',
            email: 'E-Mail',
            password: 'Password',
            no_email: 'Please add a E-Mail',
            login_error: 'An error occurred',
            no_password: 'Please add a Password',
            user_not_exist: 'User does not exist',
            wrong_password: 'Password wrong',
            app_id: 'App-ID:',
            loading: 'Loading...',
            change_avatar: 'Change Avatar',
            change_image: 'Change Image',
            take_image: 'Take Photo...',
            image_picker: 'Photo Picker',
            choose_image: 'Choose from Library...',
            delete: 'Delete',
            cancel: 'Cancel',
            input_placeholder: 'Enter Content',
            save: 'Save'
        },
        de: {
            login: 'Anmelden',
            register: 'Registrieren',
            already_account: 'Sie haben schon einen Account?',
            need_account: 'Noch keinen Account?',
            email: 'E-Mail',
            password: 'Passwort',
            no_email: 'Bitte eine E-Mail Adresse eingeben',
            no_password: 'Bitte ein Passwort eingeben',
            login_error: 'Ein Fehler beim Login ist aufgetreten',
            user_not_exist: 'Kein Nutzer mit dieser E-Mail Adresse registriert',
            wrong_password: 'Das eingegebene Passwort ist nicht korrekt',
            app_id: 'App-ID:',
            loading: 'Laden...',
            change_avatar: 'Profilbild ändern',
            change_image: 'Bild ändern',
            take_image: 'Photo aufnehmen...',
            image_picker: 'Photo ändern',
            choose_image: 'Photo auswählen...',
            delete: 'Löschen',
            cancel: 'Abbrechen',
            input_placeholder: 'Inhalt hier einfügen',
            save: 'Speichern'
        }
    }
}
