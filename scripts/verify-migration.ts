#!/usr/bin/env tsx

/**
 * Simple verification script to test migration functionality
 * This script verifies that:
 * 1. target.generated.json has the expected extended colors
 * 2. All extended colors have proper structure
 * 3. TypeScript types are working correctly
 */

import { readFileSync } from "fs";
import { resolve } from "path";
import { ExtendedTagName } from "../src/theme/extended-tags.generated";
import { ThemeTarget, getExtended, getExtendedHex } from "../src/theme/types";

const EXPECTED_TOKENS: ExtendedTagName[] = [
  'warningText', 'warningBackground', 'warningBorder',
  'informationText', 'informationBackground', 'informationBorder',
  'successText', 'successBackground', 'successBorder',
  'defaultText', 'defaultBackground', 'defaultBorder',
  'errorText', 'errorBackground', 'errorBorder',
  'blueTagText', 'blueTagBackground', 'blueTagBorder',
  'cyanTagText', 'cyanTagBackground', 'cyanTagBorder',
  'geekblueTagText', 'geekblueTagBackground', 'geekblueTagBorder',
  'goldTagText', 'goldTagBackground', 'goldTagBorder',
  'greenTagText', 'greenTagBackground', 'greenTagBorder',
  'limeTagText', 'limeTagBackground', 'limeTagBorder',
  'magentaTagText', 'magentaTagBackground', 'magentaTagBorder',
  'orangeTagText', 'orangeTagBackground', 'orangeTagBorder',
  'purpleTagText', 'purpleTagBackground', 'purpleTagBorder',
  'redTagText', 'redTagBackground', 'redTagBorder',
  'volcanoTagText', 'volcanoTagBackground', 'volcanoTagBorder'
];

function verify() {
  console.log('🔍 Verifying migration...\n');

  // Test 1: Load and validate target.generated.json structure
  console.log('1. Validating target.generated.json structure...');
  const targetPath = resolve(process.cwd(), 'target.generated.json');
  let theme: ThemeTarget;
  
  try {
    const content = readFileSync(targetPath, 'utf-8');
    theme = JSON.parse(content) as ThemeTarget;
    console.log('   ✅ Successfully loaded target.generated.json');
  } catch (error) {
    console.error('   ❌ Failed to load target.generated.json:', error);
    process.exit(1);
  }

  // Test 2: Verify extendedColors count and structure
  console.log('\n2. Validating extendedColors...');
  if (!theme.extendedColors || !Array.isArray(theme.extendedColors)) {
    console.error('   ❌ extendedColors is missing or not an array');
    process.exit(1);
  }

  console.log(`   Found ${theme.extendedColors.length} extended colors`);
  
  if (theme.extendedColors.length !== EXPECTED_TOKENS.length) {
    console.error(`   ❌ Expected ${EXPECTED_TOKENS.length} extended colors, got ${theme.extendedColors.length}`);
    process.exit(1);
  }
  console.log('   ✅ Correct number of extended colors');

  // Test 3: Verify each extended color has proper structure
  console.log('\n3. Validating extended color structure...');
  const foundTokens = new Set<string>();
  
  for (const ec of theme.extendedColors) {
    if (!ec.name || !ec.color || !ec.description || ec.harmonized !== false) {
      console.error(`   ❌ Invalid extended color structure for: ${ec.name || 'unknown'}`);
      console.error(`      Missing or invalid: name=${ec.name}, color=${ec.color}, description=${ec.description}, harmonized=${ec.harmonized}`);
      process.exit(1);
    }
    
    if (!ec.color.match(/^#[0-9A-Fa-f]{6}$/)) {
      console.error(`   ❌ Invalid hex color for ${ec.name}: ${ec.color}`);
      process.exit(1);
    }
    
    foundTokens.add(ec.name);
  }
  console.log('   ✅ All extended colors have valid structure');

  // Test 4: Verify all expected tokens are present
  console.log('\n4. Validating expected tokens are present...');
  for (const expectedToken of EXPECTED_TOKENS) {
    if (!foundTokens.has(expectedToken)) {
      console.error(`   ❌ Missing expected token: ${expectedToken}`);
      process.exit(1);
    }
  }
  console.log('   ✅ All expected tokens are present');

  // Test 5: Verify no unexpected tokens
  console.log('\n5. Checking for unexpected tokens...');
  for (const foundToken of foundTokens) {
    if (!EXPECTED_TOKENS.includes(foundToken as ExtendedTagName)) {
      console.error(`   ❌ Unexpected token found: ${foundToken}`);
      process.exit(1);
    }
  }
  console.log('   ✅ No unexpected tokens found');

  // Test 6: Test runtime accessors
  console.log('\n6. Testing runtime accessors...');
  try {
    // Test getExtended
    const warningText = getExtended(theme, 'warningText');
    if (!warningText) {
      console.error('   ❌ getExtended failed to find warningText');
      process.exit(1);
    }
    
    // Test getExtendedHex
    const warningTextHex = getExtendedHex(theme, 'warningText');
    if (!warningTextHex || !warningTextHex.match(/^#[0-9A-Fa-f]{6}$/)) {
      console.error(`   ❌ getExtendedHex returned invalid value: ${warningTextHex}`);
      process.exit(1);
    }
    
    console.log(`   ✅ Runtime accessors work correctly (warningText = ${warningTextHex})`);
  } catch (error) {
    console.error('   ❌ Runtime accessor error:', error);
    process.exit(1);
  }

  // Test 7: Verify schemes don't contain extended tokens
  console.log('\n7. Verifying schemes are clean of extended tokens...');
  const lightScheme = theme.schemes?.light || {};
  const darkScheme = theme.schemes?.dark || {};
  
  for (const token of EXPECTED_TOKENS) {
    if (token in lightScheme) {
      console.error(`   ❌ Extended token ${token} still present in light scheme`);
      process.exit(1);
    }
    if (token in darkScheme) {
      console.error(`   ❌ Extended token ${token} still present in dark scheme`);
      process.exit(1);
    }
  }
  console.log('   ✅ Schemes are clean of extended tokens');

  console.log('\n🎉 All migration verification tests passed!');
  console.log(`\n📊 Summary:`);
  console.log(`   - Extended colors: ${theme.extendedColors.length}`);
  console.log(`   - Semantic tokens: 15 (warning, information, success, default, error)`);
  console.log(`   - Tag tokens: 33 (11 colors × 3 variants each)`);
  console.log(`   - All tokens moved from schemes to extendedColors`);
  console.log(`   - TypeScript types working correctly`);
  console.log(`   - Runtime accessors functioning`);
}

verify();