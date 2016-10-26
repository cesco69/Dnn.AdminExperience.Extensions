import { siteSettings as ActionTypes, pagination as PaginationActionTypes } from "../constants/actionTypes";

export default function siteSettings(state = {
}, action) {
    switch (action.type) {
        case ActionTypes.RETRIEVED_SITESETTINGS_PORTAL_SETTINGS:
            return { ...state,
                settings: action.data.settings,
                timeZones: action.data.timeZones,
                iconSets: action.data.iconSets,
                clientModified: action.data.clientModified
            };
        case ActionTypes.SITESETTINGS_PORTAL_SETTINS_CLIENT_MODIFIED:
            return { ...state,
                settings: action.data.settings,
                clientModified: action.data.clientModified
            };
        case ActionTypes.UPDATED_SITESETTINGS_PORTAL_SETTINGS:
            return { ...state,
                clientModified: action.data.clientModified
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_DEFAULT_PAGES_SETTINGS:
            return { ...state,
                defaultPagesSettings: action.data.settings,
                defaultPagesSettingsClientModified: action.data.defaultPagesSettingsClientModified
            };
        case ActionTypes.SITESETTINGS_DEFAULT_PAGES_SETTINS_CLIENT_MODIFIED:
            return { ...state,
                defaultPagesSettings: action.data.settings,
                defaultPagesSettingsClientModified: action.data.defaultPagesSettingsClientModified
            };
        case ActionTypes.UPDATED_SITESETTINGS_DEFAULT_PAGES_SETTINGS:
            return { ...state,
                defaultPagesSettingsClientModified: action.data.defaultPagesSettingsClientModified
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_MESSAGING_SETTINGS:
            return { ...state,
                messagingSettings: action.data.settings,
                messagingSettingsClientModified: action.data.messagingSettingsClientModified
            };
        case ActionTypes.SITESETTINGS_MESSAGING_SETTINS_CLIENT_MODIFIED:
            return { ...state,
                messagingSettings: action.data.settings,
                messagingSettingsClientModified: action.data.messagingSettingsClientModified
            };
        case ActionTypes.UPDATED_SITESETTINGS_MESSAGING_SETTINGS:
            return { ...state,
                messagingSettingsClientModified: action.data.messagingSettingsClientModified
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_PROFILE_SETTINGS:
            return { ...state,
                profileSettings: action.data.settings,                
                userVisibilityOptions: action.data.userVisibilityOptions,
                profileSettingsClientModified: action.data.profileSettingsClientModified
            };
        case ActionTypes.SITESETTINGS_PROFILE_SETTINS_CLIENT_MODIFIED:
            return { ...state,
                profileSettings: action.data.settings,
                profileSettingsClientModified: action.data.profileSettingsClientModified
            };
        case ActionTypes.UPDATED_SITESETTINGS_PROFILE_SETTINGS:
            return { ...state,
                profileSettingsClientModified: action.data.profileSettingsClientModified
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_PROFILE_PROPERTIES:
            return { ...state,
                profileProperties: action.data.profileProperties
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_PROFILE_PROPERTY:
            return { ...state,
                profileProperty: action.data.profileProperty,
                userVisibilityOptions: action.data.userVisibilityOptions,
                dataTypeOptions: action.data.dataTypeOptions,
                languageOptions: action.data.languageOptions,
                profilePropertyClientModified: action.data.profilePropertyClientModified
            };
        case ActionTypes.SITESETTINGS_PROFILE_PROPERTY_CLIENT_MODIFIED:
            return { ...state,
                profileProperty: action.data.profileProperty,
                profilePropertyClientModified: action.data.profilePropertyClientModified
            };
        case ActionTypes.CANCELED_SITESETTINGS_PROFILE_PROPERTY_CLIENT_MODIFIED:
            return { ...state,
                profilePropertyClientModified: action.data.profilePropertyClientModified
            };
        case ActionTypes.RETRIEVED_SITESETTINGS_PROFILE_PROPERTY_LOCALIZATION:
        case ActionTypes.SITESETTINGS_PROFILE_PROPERTY_LOCALIZATION_CLIENT_MODIFIED:
            return { ...state,
                propertyLocalization: action.data.propertyLocalization,                
                propertyLocalizationClientModified: action.data.propertyLocalizationClientModified
            };
        case ActionTypes.CREATED_SITESETTINGS_PROFILE_PROPERTY:
        case ActionTypes.UPDATED_SITESETTINGS_PROFILE_PROPERTY:
            return { ...state,
                profilePropertyClientModified: action.data.profilePropertyClientModified
            };
        case ActionTypes.CANCELED_SITESETTINGS_PROFILE_PROPERTY_LOCALIZATION_CLIENT_MODIFIED:
            return { ...state,
                propertyLocalizationClientModified: action.data.propertyLocalizationClientModified
            };
        default:
            return { ...state
            };
    }
}