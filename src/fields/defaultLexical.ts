import type { TextFieldSingleValidation } from 'payload'
import {
  BoldFeature,
  ItalicFeature,
  LinkFeature,
  ParagraphFeature,
  lexicalEditor,
  UnderlineFeature,
  OrderedListFeature,
  UnorderedListFeature,
  AlignFeature,
  UploadFeature,
  IndentFeature,

  StrikethroughFeature,
  SubscriptFeature,
  SuperscriptFeature,
  ChecklistFeature,
  RelationshipFeature,
  HorizontalRuleFeature,
  EXPERIMENTAL_TableFeature,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

export const defaultLexical = lexicalEditor({
  features: [
    StrikethroughFeature(),
    SubscriptFeature(),
    SuperscriptFeature(),
    ChecklistFeature(),
    RelationshipFeature(),
    HorizontalRuleFeature(),
    EXPERIMENTAL_TableFeature(),
    ParagraphFeature(),
    UnderlineFeature(),
    BoldFeature(),
    ItalicFeature(),
    OrderedListFeature(),
    UnorderedListFeature(),
    AlignFeature(),
    UploadFeature(),
    IndentFeature(),
    LinkFeature({
      enabledCollections: ['pages', 'posts'],
      fields: ({ defaultFields }) => {
        const defaultFieldsWithoutUrl = defaultFields.filter((field) => {
          if ('name' in field && field.name === 'url') return false
          return true
        })

        return [
          ...defaultFieldsWithoutUrl,
                    {
            name: 'title',
            type: 'text',
            label: 'Title Attribute',
            admin: {
              description:  'The title attribute provides additional information about the link.',
            },
          },
          {
            name: 'url',
            type: 'text',
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType !== 'internal',
            },
            label: ({ t }) => t('fields:enterURL'),
            required: true,
            validate: ((value, options) => {
              if ((options?.siblingData as LinkFields)?.linkType === 'internal') {
                return true // no validation needed, as no url should exist for internal links
              }
              return value ? true : 'URL is required'
            }) as TextFieldSingleValidation,
          },
        ]
      },
    }),
  ],
})
