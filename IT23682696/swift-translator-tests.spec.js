const { test, expect } = require('@playwright/test');

// Configuration
const CONFIG = {
  url: 'https://www.swifttranslator.com/',
  timeouts: {
    pageLoad: 2000,
    afterClear: 1000,
    translation: 3000,
    betweenTests: 2000
  },
  selectors: {
    inputField: 'Input Your Singlish Text Here.',
    outputContainer: 'div.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap'
  }
};

// Test Data - Completely New Test Cases
const TEST_DATA = {
  positive: [
    // --- 1. Sentence Structures ---
    {
      tcId: 'Pos_Fun_001',
      name: 'Short daily greeting',
      input: 'aayuboovan!',
      expected: 'ආයුබෝවන්!',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_002',
      name: 'Simple present tense',
      input: 'mama bath kanavaa.',
      expected: 'මම බත් කනවා.',
      category: 'Daily language usage',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_003',
      name: 'Compound sentence conversion',
      input: 'mama gedhara yanavaa saha ammaa kaeema hadhanavaa.',
      expected: 'මම ගෙදර යනවා සහ අම්මා කෑම හදනවා.',
      category: 'Daily language usage',
      grammar: 'Compound sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_004',
      name: 'Complex conditional sentence',
      input: 'oyaa enavaanam mama balan innavaa.',
      expected: 'ඔයා එනවානම් මම බලන් ඉන්නවා.',
      category: 'Daily language usage',
      grammar: 'Complex sentence',
      length: 'M'
    },

    // --- 2. Interrogative & Imperative ---
    {
      tcId: 'Pos_Fun_005',
      name: 'Question form conversion',
      input: 'oyaata kohomadha?',
      expected: 'ඔයාට කොහොමද?',
      category: 'Greeting / request / response',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_006',
      name: 'Imperative command',
      input: 'vahaama methanata enna.',
      expected: 'වහාම මෙතනට එන්න.',
      category: 'Daily language usage',
      grammar: 'Imperative (command)',
      length: 'S'
    },

    // --- 3. Positive & Negative ---
    {
      tcId: 'Pos_Fun_007',
      name: 'Negative form verification',
      input: 'mama ehema karannee naehae.',
      expected: 'මම එහෙම කරන්නේ නැහැ.',
      category: 'Positive vs negative forms',
      grammar: 'Negation (negative form)',
      length: 'S'
    },

    // --- 4. Greetings & Requests ---
    {
      tcId: 'Pos_Fun_008',
      name: 'Polite request phrasing',
      input: 'karuNaakaralaa eeka poddak balanna.',
      expected: 'කරුණාකරලා ඒක පොඩ්ඩක් බලන්න.',
      category: 'Polite vs informal phrasing',
      grammar: 'Imperative (command)',
      length: 'M'
    },

    // --- 5. Informal & Slang ---
    {
      tcId: 'Pos_Fun_009',
      name: 'Informal slang greeting',
      input: 'ela kiri machan!',
      expected: 'එල කිරි මචන්!',
      category: 'Slang / informal language',
      grammar: 'Simple sentence',
      length: 'S'
    },

    // --- 6. Word Combinations ---
    {
      tcId: 'Pos_Fun_010',
      name: 'Word collocation (Eating)',
      input: 'kaeema kanna yamu.',
      expected: 'කෑම කන්න යමු.',
      category: 'Word combination / phrase pattern',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_011',
      name: 'Repeated words for emphasis',
      input: 'hari hari mama ennam.',
      expected: 'හරි හරි මම එන්නම්.',
      category: 'Word combination / phrase pattern',
      grammar: 'Simple sentence',
      length: 'S'
    },

    // --- 7. Tenses & Grammatical Forms ---
    {
      tcId: 'Pos_Fun_012',
      name: 'Past tense variation',
      input: 'mama iiyee gedhara giyaa.',
      expected: 'මම ඊයේ ගෙදර ගියා.',
      category: 'Daily language usage',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_013',
      name: 'Future tense with place name',
      input: 'api heta Kandy yamudha?',
      expected: 'අපි හෙට Kandy යමුද?',
      category: 'Names / places / common English words',
      grammar: 'Future tense',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_014',
      name: 'Plural pronoun variation',
      input: 'eyaalaa adha ennee nae.',
      expected: 'එයාලා අද එන්නේ නැ.',
      category: 'Daily language usage',
      grammar: 'Pronoun variation (I/you/we/they)',
      length: 'S'
    },

    // --- 8. Mixed Language & English Terms ---
    {
      tcId: 'Pos_Fun_015',
      name: 'Mixed language technical',
      input: 'Teams meeting ekee link eka WhatsApp karanna.',
      expected: 'Teams meeting එකේ link එක WhatsApp කරන්න.',
      category: 'Mixed Singlish + English',
      grammar: 'Imperative (command)',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_016',
      name: 'Abbreviations and Short forms',
      input: 'PIN saha OTP eka evanna.',
      expected: 'PIN සහ OTP එක එවන්න.',
      category: 'Mixed Singlish + English',
      grammar: 'Simple sentence',
      length: 'S'
    },

    // --- 9. Numbers & Formatting ---
    {
      tcId: 'Pos_Fun_017',
      name: 'Currency and Numeric formats',
      input: 'mila Rs. 1500.50 venavaa.',
      expected: 'මිල Rs. 1500.50 වෙනවා.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_018',
      name: 'Time and Unit measurement',
      input: '7.30 AM vana vita 10kg oonee.',
      expected: '7.30 AM වන විට 10kg ඕනේ.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_019',
      name: 'Multiple space robustness',
      input: 'mama gedhara yanavaa.',
      expected: 'මම ගෙදර යනවා.',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_020',
      name: 'Multi-line line breaks',
      input: 'api passee \n kathaa karamu.',
      expected: 'අපි පස්සේ \n කතා කරමු.',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Future tense',
      length: 'M'
    },

    // --- 10. Additional Variations ---
    {
      tcId: 'Pos_Fun_021',
      name: 'Singular subject pronoun',
      input: 'eyaa gedhara giyaa.',
      expected: 'එයා ගෙදර ගියා.',
      category: 'Daily language usage',
      grammar: 'Pronoun variation (I/you/we/they)',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_022',
      name: 'Common greeting response',
      input: 'suba udhaeesanak!',
      expected: 'සුබ උදෑසනක්!',
      category: 'Greeting / request / response',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Pos_Fun_023',
      name: 'Medium length mixed content',
      input: 'nimaali office enna late vennee traffic nisaa.',
      expected: 'නිමාලි office එන්න late වෙන්නේ traffic නිසා.',
      category: 'Names / places / common English words',
      grammar: 'Simple sentence',
      length: 'M'
    },
    {
      tcId: 'Pos_Fun_024',
      name: 'Long paragraph input',
      input: 'dhitvaa suLi kuNaatuva samaGa aethi vuu gQQvathura saha naayayaeem heethuven maarga sQQvarDhana aDhikaariya sathu maarga kotas 430k vinaashayata pathva aethi athara, ehi samastha dhiga pramaaNaya kiloomiitar 300k pamaNa vana bava',
      expected: 'දිට්වා සුළි කුණාටුව සමඟ ඇති වූ ගංවතුර සහ නායයෑම් හේතුවෙන් මාර්ග සංවර්ධන අධිකාරිය සතු මාර්ග කොටස් 430ක් විනාශයට පත්ව ඇති අතර, එහි සමස්ත දිග ප්‍රමාණය කිලෝමීටර් 300ක් පමණ වන බව',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Complex sentence',
      length: 'L'
    }
  ],

  negative: [
    {
      tcId: 'Neg_Fun_001',
      name: 'Missing spaces (Stress test)',
      input: 'mamagedharayanavaa',
      expected: 'මම ගෙදර යනවා', // Note: System fails to segment
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_002',
      name: 'Non-standard phonetics',
      input: 'gQvathura',
      expected: 'ගංවතුර',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_003',
      name: 'Informal spelling distortion',
      input: 'adoo mona pishsudha ban',
      expected: 'අඩෝ මොන පිස්සුද බං',
      category: 'Slang / informal language',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_004',
      name: 'Case Sensitivity Error',
      input: 'MAMA GEDHARA YANAVAA',
      expected: 'මම ගෙදර යනවා',
      category: 'Typographical error handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_005',
      name: 'Ambiguous unit measurement',
      input: 'meka 50kg barayi.',
      expected: 'මේක 50kg බරයි.',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_006',
      name: 'Complex Date Phonetics',
      input: '2026-05-21 vunaa.',
      expected: '2026-05-21 වුණා.',
      category: 'Punctuation / numbers',
      grammar: 'Past tense',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_007',
      name: 'Special symbol interference and spaces',
      input: 'mama  @ office  #work',
      expected: 'මම @ office #work',
      category: 'Punctuation / numbers',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_008',
      name: 'Joined Suffix Error',
      input: 'apiyanavadha?',
      expected: 'අපි යනවාද?',
      category: 'Word combination / phrase pattern',
      grammar: 'Interrogative (question)',
      length: 'S'
    },
    {
      tcId: 'Neg_Fun_009',
      name: 'Paragraph without breaks',
      input: 'mamagedharayanavaaoyaenavaanammmamabalaninnavaaapikaeemakannayanamvasahasahapassechithrapatayakuthbalanavaa',
      expected: 'මම ගෙදර යනවා ඔයා එනවනම් මම බලන් ඉන්නවා අපි කෑම කන්න  යනවා සහ සපත්තුත් බලනවා',
      category: 'Formatting (spaces / line breaks / paragraph)',
      grammar: 'Complex sentence',
      length: 'L'
    },
    {
      tcId: 'Neg_Fun_010',
      name: 'Common English Context',
      input: 'mama late venava.',
      expected: 'මම late වෙනවා.',
      category: 'Names / places / common English words',
      grammar: 'Simple sentence',
      length: 'S'
    }
  ],

  ui: [
    {
      tcId: 'Pos_UI_001',
      name: 'numbers',
      input: '12345',
      expected: '12345',
      category: 'Empty/cleared input handling',
      grammar: 'Simple sentence',
      length: 'S'
    },
    {
      tcId: 'Neg_UI_001',
      name: 'numbers spaces',
      input: '1234  5',
      expected: '12345',
      category: 'Empty/cleared input handling',
      grammar: 'Simple sentence',
      length: 'S'
    }
  ]
};

// Helper Functions
class TranslatorPage {
  constructor(page) {
    this.page = page;
  }

  async navigateToSite() {
    await this.page.goto(CONFIG.url);
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(CONFIG.timeouts.pageLoad);
  }

  async getInputField() {
    return this.page.getByRole('textbox', { name: CONFIG.selectors.inputField });
  }

  async getOutputField() {
    return this.page
      .locator(CONFIG.selectors.outputContainer)
      .filter({ hasNot: this.page.locator('textarea') })
      .first();
  }

  async clearAndWait() {
    const input = await this.getInputField();
    await input.clear();
    await this.page.waitForTimeout(CONFIG.timeouts.afterClear);
  }

  async typeInput(text) {
    const input = await this.getInputField();
    await input.fill(text);
  }

  async waitForOutput() {
    await this.page.waitForFunction(
      () => {
        const elements = Array.from(
          document.querySelectorAll('.w-full.h-80.p-3.rounded-lg.ring-1.ring-slate-300.whitespace-pre-wrap')
        );
        const output = elements.find(el => {
          const isInputField = el.tagName === 'TEXTAREA' || el.getAttribute('role') === 'textbox';
          return !isInputField && el.textContent && el.textContent.trim().length > 0;
        });
        return output !== undefined;
      },
      { timeout: 10000 }
    );
    await this.page.waitForTimeout(CONFIG.timeouts.translation);
  }

  async getOutputText() {
    const output = await this.getOutputField();
    const text = await output.textContent();
    return text.trim();
  }

  async performTranslation(inputText) {
    await this.clearAndWait();
    await this.typeInput(inputText);
    await this.waitForOutput();
    return await this.getOutputText();
  }
}

// Test Suite
test.describe('SwiftTranslator - Singlish to Sinhala Conversion Tests', () => {
  let translator;

  test.beforeEach(async ({ page }) => {
    translator = new TranslatorPage(page);
    await translator.navigateToSite();
  });

  // Positive Functional Tests
  test.describe('Positive Functional Tests', () => {
    for (const testCase of TEST_DATA.positive) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // Negative Functional Tests
  test.describe('Negative Functional Tests', () => {
    for (const testCase of TEST_DATA.negative) {
      test(`${testCase.tcId} - ${testCase.name}`, async () => {
        const actualOutput = await translator.performTranslation(testCase.input);
        expect(actualOutput).toBe(testCase.expected);
        await translator.page.waitForTimeout(CONFIG.timeouts.betweenTests);
      });
    }
  });

  // UI Test
  test.describe('UI Functionality Tests', () => {
    test(`${TEST_DATA.ui.tcId} - ${TEST_DATA.ui.name}`, async ({ page }) => {
      const translator = new TranslatorPage(page);
      const input = await translator.getInputField();
      const output = await translator.getOutputField();

      await translator.clearAndWait();
      
      // Type partial input
      await input.pressSequentially(TEST_DATA.ui.partialInput, { delay: 150 });
      
      // Wait for partial output
      await page.waitForTimeout(1500);
      
      // Verify partial translation appears
      let outputText = await output.textContent();
      expect(outputText.trim().length).toBeGreaterThan(0);
      
      // Complete typing
      await input.pressSequentially(TEST_DATA.ui.input.substring(TEST_DATA.ui.partialInput.length), { delay: 150 });
      
      // Wait for full translation
      await translator.waitForOutput();
      
      // Verify full translation
      outputText = await translator.getOutputText();
      expect(outputText).toBe(TEST_DATA.ui.expectedFull);
      
      await page.waitForTimeout(CONFIG.timeouts.betweenTests);
    });
  });
});
