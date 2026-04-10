import { GoogleGenAI, Type, Modality } from "@google/genai";

export interface BrandIdentity {
  name: string;
  mission: string;
  tagline: string;
  personality: {
    trait: string;
    rationale: string;
  }[];
  colors: {
    hex: string;
    name: string;
    usage: string;
  }[];
  typography: {
    headerFont: string;
    bodyFont: string;
    rationale: string;
  };
  socialMediaTemplates: {
    name: string;
    platform: string;
    description: string;
    layout: string;
    contentPlacement: string;
    integration: string;
    placeholderText: string;
    imageSuggestion: string;
  }[];
  brandVoice: {
    tone: string;
    messaging: string;
    personality: string;
    rationale: string;
    languageToUse: string[];
    languageToAvoid: string[];
    characteristics: {
      name: string;
      explanation: string;
      exampleSentence: string;
    }[];
    voiceExamples: {
      context: string;
      application: string;
      example: string;
    }[];
  };
  logoPrompt: string;
  monochromaticLogoPrompt: string;
  reversedLogoPrompt: string;
  iconOnlyLogoPrompt: string;
  horizontalLogoPrompt: string;
  verticalLogoPrompt: string;
  secondaryMarkPrompts: string[];
  abstractIcons: {
    prompt: string;
    description: string;
  }[];
  profileImagePrompts: string[];
  businessCardDesign: {
    front: string;
    back: string;
    layoutRationale: string;
  };
  slogans: {
    slogan: string;
    rationale: string;
  }[];
  marketingCopy: {
    voiceWords: string[];
    taglines: string[];
    brandDescription: string;
  };
  moodBoard: {
    description: string;
    imageryStyle: string;
    textures: string[];
    imagePrompts: string[];
  };
  imagery: {
    photography: {
      style: string;
      examples: string[];
    };
    illustration: {
      style: string;
      examples: string[];
    };
  };
  brandGuidelines: {
    logoUsage: {
      clearSpace: string;
      minimumSize: string;
      placement: string;
      digitalMockups: {
        acceptable: string[];
        unacceptable: string[];
      };
      printMockups: {
        acceptable: string[];
        unacceptable: string[];
      };
    };
    colorPaletteVariations: {
      primary: string[];
      secondary: string[];
      accent: string[];
    };
    typographyHierarchy: {
      h1: { usage: string; style: string };
      h2: { usage: string; style: string };
      h3: { usage: string; style: string };
      body: { usage: string; style: string };
      caption: { usage: string; style: string };
    };
    brandMarkApplications: {
      acceptable: string[];
      unacceptable: string[];
    };
    socialMediaIconStyle: {
      colorUsage: string;
      sizeConstraints: string;
      acceptableVariations: string[];
      guidance: string;
    };
    logoVersionGuidelines: {
      primary: { acceptable: string[]; unacceptable: string[] };
      monochromatic: { acceptable: string[]; unacceptable: string[] };
      reversed: { acceptable: string[]; unacceptable: string[] };
    };
  };
}

export const generateBrandStrategy = async (mission: string, logoStyle: string = "Minimalist", desiredBrandVoice: string = ""): Promise<BrandIdentity> => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  
  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
    contents: `Create a comprehensive brand identity strategy based on this mission: "${mission}".
    ${desiredBrandVoice ? `The desired brand voice and tone is: "${desiredBrandVoice}". Please ensure all generated copy, messaging, and visual style recommendations reflect this voice.` : ''}
    Provide a brand name, tagline, 3 personality traits with a brief rationale for each, a 5-color palette (hex, name, usage), and Google Font pairings (header and body) with a detailed typography strategy explaining the choice.
    Also provide a Brand Voice section including tone guidelines, messaging principles, an overall brand personality description derived from the mission, examples of language to use and language to avoid, 3-5 key characteristics of the brand's voice (with explanations and example sentences for each), and 3 specific examples of how the tone and messaging should be applied in different communication channels (e.g., Social Media, Website Copy, Customer Support). For each channel, explain how the voice is applied and provide a concrete copy example.
    Also provide 5-10 slogan options, each with a brief rationale explaining how it aligns with the company mission.
    Also generate marketing copy guidelines: suggest 3-5 descriptive words for the brand's voice (e.g., playful, authoritative), create 3-5 concise and memorable taglines, and write a short (50-75 word) brand description that embodies the brand identity. Ensure the generated copy reflects the brand's voice and tone, and aligns with the generated brand elements (colors, fonts, etc.).
    Also provide 3-5 adaptable visual template concepts for social media posts (e.g., Instagram, Twitter). Describe how they incorporate the brand identity, and include placeholder text and image suggestions relevant to a general business context.
    Also generate a mood board or visual theme based on the brand identity. Include a description of the visual theme, the imagery style, a list of suggested textures/patterns, and 4 detailed image prompts that could be used to generate mood board images.
    Also provide imagery style suggestions based on the mission and color palette. Suggest a style for brand photography (e.g., candid, professional, minimalist) and illustration (e.g., flat design, hand-drawn, abstract). Provide 2-3 example image descriptions or mood board concepts for each.
    Also outline detailed brand guidelines, including logo usage rules (clear space, minimum size, placement, and specific examples of acceptable and unacceptable mockups for digital and print applications, referencing the primary, monochromatic, and reversed logo versions), color palette variations (primary, secondary, accent), a detailed typography hierarchy (for h1, h2, h3, body, and caption, including usage context and styling rules like font size, weight, and case), acceptable/unacceptable brand mark applications, social media icon style (color usage, size constraints, acceptable variations, and guidance on usage), and a dedicated section for logo version guidelines (detailing acceptable and unacceptable uses for the primary, monochromatic, and reversed versions in digital and print contexts).
    Also provide highly detailed prompts for generating a primary logo, a monochromatic version, a reversed version, an icon-only version, a horizontal version, and a vertical version. The primary logo MUST be in a ${logoStyle} style.
    Furthermore, generate 3 variations of secondary marks or simplified logos specifically optimized for social media profile pictures (Twitter, Facebook, Instagram), ensuring they are legible at small sizes and fit common circular/square aspect ratios.
    Also, design a professional business card mockup. Provide a detailed description for the front and back of the card, specifying the placement of the logo, company name, tagline, contact information placeholders (Name, Title, Email, Phone, Website), and the company mission statement. Explain the layout rationale.
    Finally, suggest a set of 3-5 simple, abstract icons suitable for social media profile pictures or favicons. These icons should be inspired by the generated logo and color palette. Provide a detailed image generation prompt and a brief description for each icon.`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          mission: { type: Type.STRING },
          tagline: { type: Type.STRING },
          personality: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT,
              properties: {
                trait: { type: Type.STRING },
                rationale: { type: Type.STRING }
              },
              required: ["trait", "rationale"]
            } 
          },
          colors: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hex: { type: Type.STRING },
                name: { type: Type.STRING },
                usage: { type: Type.STRING }
              },
              required: ["hex", "name", "usage"]
            }
          },
          typography: {
            type: Type.OBJECT,
            properties: {
              headerFont: { type: Type.STRING },
              bodyFont: { type: Type.STRING },
              rationale: { type: Type.STRING, description: "Detailed explanation of why these fonts were chosen and how they complement the brand identity." }
            },
            required: ["headerFont", "bodyFont", "rationale"]
          },
          brandVoice: {
            type: Type.OBJECT,
            properties: {
              tone: { type: Type.STRING, description: "Description of the brand's tone of voice (e.g., 'Professional yet approachable', 'Bold and disruptive')." },
              messaging: { type: Type.STRING, description: "Key messaging principles and how the brand should communicate its value." },
              personality: { type: Type.STRING, description: "A summary of the overall brand personality derived from the mission." },
              rationale: { type: Type.STRING, description: "Explanation of how this voice aligns with the company mission." },
              languageToUse: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of words or phrases to use." },
              languageToAvoid: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of words or phrases to avoid." },
              characteristics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING, description: "Name of the characteristic (e.g., formal, playful)." },
                    explanation: { type: Type.STRING, description: "Brief explanation of the characteristic." },
                    exampleSentence: { type: Type.STRING, description: "An example sentence demonstrating this characteristic." }
                  },
                  required: ["name", "explanation", "exampleSentence"]
                },
                description: "3-5 key characteristics of the brand's voice."
              },
              voiceExamples: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    context: { type: Type.STRING, description: "Communication channel (e.g., Social Media, Website Copy, Customer Support)" },
                    application: { type: Type.STRING, description: "How the voice should be applied in this channel." },
                    example: { type: Type.STRING, description: "An actual copy example for this channel." }
                  },
                  required: ["context", "application", "example"]
                }
              }
            },
            required: ["tone", "messaging", "personality", "rationale", "languageToUse", "languageToAvoid", "characteristics", "voiceExamples"]
          },
          slogans: {
            type: Type.ARRAY,
            description: "5-10 slogan options based on the company mission, with reasoning for each.",
            items: {
              type: Type.OBJECT,
              properties: {
                slogan: { type: Type.STRING },
                rationale: { type: Type.STRING }
              },
              required: ["slogan", "rationale"]
            }
          },
          marketingCopy: {
            type: Type.OBJECT,
            description: "Marketing copy guidelines and samples.",
            properties: {
              voiceWords: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 descriptive words for the brand's voice."
              },
              taglines: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "3-5 concise and memorable taglines."
              },
              brandDescription: {
                type: Type.STRING,
                description: "A short (50-75 word) brand description."
              }
            },
            required: ["voiceWords", "taglines", "brandDescription"]
          },
          logoPrompt: { type: Type.STRING, description: `Detailed prompt for a ${logoStyle} primary logo` },
          monochromaticLogoPrompt: { type: Type.STRING, description: `Detailed prompt for a monochromatic (single color) version of the primary logo` },
          reversedLogoPrompt: { type: Type.STRING, description: `Detailed prompt for a reversed (white on dark background) version of the primary logo` },
          iconOnlyLogoPrompt: { type: Type.STRING, description: `Detailed prompt for an icon-only (no text) version of the primary logo` },
          horizontalLogoPrompt: { type: Type.STRING, description: `Detailed prompt for a horizontal layout version of the primary logo` },
          verticalLogoPrompt: { type: Type.STRING, description: `Detailed prompt for a vertical/stacked layout version of the primary logo` },
          secondaryMarkPrompts: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: `3 detailed prompts for secondary brand marks or icons that complement the primary logo. These should be variations like a simplified icon, a badge version, or a horizontal layout.`
          },
          abstractIcons: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                prompt: { type: Type.STRING, description: "Detailed image generation prompt for the abstract icon." },
                description: { type: Type.STRING, description: "Brief description of the icon and its inspiration." }
              },
              required: ["prompt", "description"]
            },
            description: "3-5 simple, abstract icons suitable for social media profile pictures or favicons."
          },
          profileImagePrompts: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "3 detailed prompts for social media profile pictures, optimized for legibility at small sizes."
          },
          businessCardDesign: {
            type: Type.OBJECT,
            properties: {
              front: { type: Type.STRING, description: "Description of the business card front layout." },
              back: { type: Type.STRING, description: "Description of the business card back layout." },
              layoutRationale: { type: Type.STRING, description: "Explanation of the design choices for the business card." }
            },
            required: ["front", "back", "layoutRationale"]
          },
          socialMediaTemplates: {
            type: Type.ARRAY,
            description: "3-5 adaptable social media post templates (e.g., Instagram, Twitter).",
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING, description: "Name of the template concept (e.g., 'Product Spotlight', 'Quote Card')" },
                platform: { type: Type.STRING, description: "Target platform (e.g., 'Instagram', 'Twitter')" },
                description: { type: Type.STRING, description: "Overall description of the template's vibe and purpose." },
                layout: { type: Type.STRING, description: "Description of the layout structure." },
                contentPlacement: { type: Type.STRING, description: "Where typical content (text, images) should be placed." },
                integration: { type: Type.STRING, description: "How brand elements (logo, colors, fonts) should be integrated." },
                placeholderText: { type: Type.STRING, description: "Placeholder text relevant to a general business context." },
                imageSuggestion: { type: Type.STRING, description: "Image suggestion relevant to a general business context." }
              },
              required: ["name", "platform", "description", "layout", "contentPlacement", "integration", "placeholderText", "imageSuggestion"]
            }
          },
          moodBoard: {
            type: Type.OBJECT,
            description: "A mood board or visual theme based on the brand identity.",
            properties: {
              description: { type: Type.STRING, description: "Overall description of the visual theme." },
              imageryStyle: { type: Type.STRING, description: "Description of the photography or illustration style." },
              textures: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of suggested textures and patterns (e.g., 'Matte paper', 'Grainy noise')."
              },
              imagePrompts: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "4 detailed image prompts that could be used to generate mood board images."
              }
            },
            required: ["description", "imageryStyle", "textures", "imagePrompts"]
          },
          imagery: {
            type: Type.OBJECT,
            description: "Imagery style suggestions for photography and illustration.",
            properties: {
              photography: {
                type: Type.OBJECT,
                properties: {
                  style: { type: Type.STRING, description: "Photography style (e.g., candid, professional, minimalist)." },
                  examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 example image descriptions or mood board concepts." }
                },
                required: ["style", "examples"]
              },
              illustration: {
                type: Type.OBJECT,
                properties: {
                  style: { type: Type.STRING, description: "Illustration style (e.g., flat design, hand-drawn, abstract)." },
                  examples: { type: Type.ARRAY, items: { type: Type.STRING }, description: "2-3 example image descriptions or mood board concepts." }
                },
                required: ["style", "examples"]
              }
            },
            required: ["photography", "illustration"]
          },
          brandGuidelines: {
            type: Type.OBJECT,
            description: "Detailed brand guidelines.",
            properties: {
              logoUsage: {
                type: Type.OBJECT,
                properties: {
                  clearSpace: { type: Type.STRING, description: "Rules for clear space around the logo." },
                  minimumSize: { type: Type.STRING, description: "Minimum size requirements for the logo." },
                  placement: { type: Type.STRING, description: "Guidelines for logo placement." },
                  digitalMockups: {
                    type: Type.OBJECT,
                    properties: {
                      acceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of acceptable digital mockups (e.g., website header, app icon) referencing primary/monochromatic/reversed versions." },
                      unacceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of unacceptable digital mockups." }
                    },
                    required: ["acceptable", "unacceptable"]
                  },
                  printMockups: {
                    type: Type.OBJECT,
                    properties: {
                      acceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of acceptable print mockups (e.g., business cards, billboards) referencing primary/monochromatic/reversed versions." },
                      unacceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Examples of unacceptable print mockups." }
                    },
                    required: ["acceptable", "unacceptable"]
                  }
                },
                required: ["clearSpace", "minimumSize", "placement", "digitalMockups", "printMockups"]
              },
              colorPaletteVariations: {
                type: Type.OBJECT,
                properties: {
                  primary: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Primary color hex codes." },
                  secondary: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Secondary color hex codes." },
                  accent: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Accent color hex codes." }
                },
                required: ["primary", "secondary", "accent"]
              },
              typographyHierarchy: {
                type: Type.OBJECT,
                properties: {
                  h1: { 
                    type: Type.OBJECT, 
                    properties: { 
                      usage: { type: Type.STRING, description: "Usage context for H1." },
                      style: { type: Type.STRING, description: "Styling rules (e.g., 'Bold, 48px, Uppercase')." }
                    },
                    required: ["usage", "style"]
                  },
                  h2: { 
                    type: Type.OBJECT, 
                    properties: { 
                      usage: { type: Type.STRING, description: "Usage context for H2." },
                      style: { type: Type.STRING, description: "Styling rules." }
                    },
                    required: ["usage", "style"]
                  },
                  h3: { 
                    type: Type.OBJECT, 
                    properties: { 
                      usage: { type: Type.STRING, description: "Usage context for H3." },
                      style: { type: Type.STRING, description: "Styling rules." }
                    },
                    required: ["usage", "style"]
                  },
                  body: { 
                    type: Type.OBJECT, 
                    properties: { 
                      usage: { type: Type.STRING, description: "Usage context for body text." },
                      style: { type: Type.STRING, description: "Styling rules." }
                    },
                    required: ["usage", "style"]
                  },
                  caption: { 
                    type: Type.OBJECT, 
                    properties: { 
                      usage: { type: Type.STRING, description: "Usage context for captions." },
                      style: { type: Type.STRING, description: "Styling rules." }
                    },
                    required: ["usage", "style"]
                  }
                },
                required: ["h1", "h2", "h3", "body", "caption"]
              },
              brandMarkApplications: {
                type: Type.OBJECT,
                properties: {
                  acceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of acceptable brand mark applications." },
                  unacceptable: { type: Type.ARRAY, items: { type: Type.STRING }, description: "List of unacceptable brand mark applications." }
                },
                required: ["acceptable", "unacceptable"]
              },
              socialMediaIconStyle: {
                type: Type.OBJECT,
                properties: {
                  colorUsage: { type: Type.STRING, description: "Requirements for color usage in abstract icons." },
                  sizeConstraints: { type: Type.STRING, description: "Size constraints for abstract icons (e.g., minimum 50x50 pixels)." },
                  acceptableVariations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Acceptable variations based on the generated abstract icons." },
                  guidance: { type: Type.STRING, description: "Guidance on how these icons should be used (e.g., as profile pictures, favicons)." }
                },
                required: ["colorUsage", "sizeConstraints", "acceptableVariations", "guidance"]
              },
              logoVersionGuidelines: {
                type: Type.OBJECT,
                properties: {
                  primary: {
                    type: Type.OBJECT,
                    properties: {
                      acceptable: { type: Type.ARRAY, items: { type: Type.STRING } },
                      unacceptable: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["acceptable", "unacceptable"]
                  },
                  monochromatic: {
                    type: Type.OBJECT,
                    properties: {
                      acceptable: { type: Type.ARRAY, items: { type: Type.STRING } },
                      unacceptable: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["acceptable", "unacceptable"]
                  },
                  reversed: {
                    type: Type.OBJECT,
                    properties: {
                      acceptable: { type: Type.ARRAY, items: { type: Type.STRING } },
                      unacceptable: { type: Type.ARRAY, items: { type: Type.STRING } }
                    },
                    required: ["acceptable", "unacceptable"]
                  }
                },
                required: ["primary", "monochromatic", "reversed"]
              }
            },
            required: ["logoUsage", "colorPaletteVariations", "typographyHierarchy", "brandMarkApplications", "socialMediaIconStyle", "logoVersionGuidelines"]
          }
        },
        required: ["name", "mission", "tagline", "personality", "colors", "typography", "logoPrompt", "monochromaticLogoPrompt", "reversedLogoPrompt", "iconOnlyLogoPrompt", "secondaryMarkPrompts", "abstractIcons", "profileImagePrompts", "businessCardDesign", "socialMediaTemplates", "brandVoice", "slogans", "marketingCopy", "moodBoard", "brandGuidelines"]
      }
    }
  });

  return JSON.parse(response.text);
};

export const generateImage = async (
  prompt: string, 
  size: "512px" | "1K" | "2K" | "4K" = "1K",
  aspectRatio: string = "1:1",
  negativePrompt?: string
): Promise<string> => {
  // We must create a new instance to ensure we use the latest API key from the dialog
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || process.env.GEMINI_API_KEY! });
  
  const finalPrompt = negativePrompt ? `${prompt}\n\nExclude the following elements: ${negativePrompt}` : prompt;

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-flash-image-preview',
    contents: {
      parts: [
        {
          text: finalPrompt,
        },
      ],
    },
    config: {
      imageConfig: {
        aspectRatio: aspectRatio as any,
        imageSize: size
      }
    },
  });

  for (const part of response.candidates?.[0]?.content?.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  
  throw new Error("No image data returned from model");
};

export const chatWithBrandExpert = async (message: string, brandContext: BrandIdentity) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });
  const chat = ai.chats.create({
    model: "gemini-3.1-pro-preview",
    config: {
      systemInstruction: `You are a world-class brand consultant. You are helping a user with their brand: ${brandContext.name}. 
      Brand Mission: ${brandContext.mission}
      Brand Personality: ${brandContext.personality.map(p => p.trait).join(", ")}
      Keep your answers professional, insightful, and focused on building a strong brand identity.`,
    },
  });

  const response = await chat.sendMessage({ message });
  return response.text;
};
