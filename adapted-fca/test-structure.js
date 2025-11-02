/**
 * Structure verification test for FCA GoatBot adaptation
 * This verifies that the package structure is correct
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Verifying FCA package structure...\n');

const checks = [];

// Check 1: Main entry point exists
checks.push({
    name: 'index.js exists',
    test: () => fs.existsSync('index.js'),
    required: true
});

// Check 2: Package.json exists and is valid
checks.push({
    name: 'package.json valid',
    test: () => {
        try {
            const pkg = require('./package.json');
            return pkg.name && pkg.version && pkg.main === 'index.js';
        } catch {
            return false;
        }
    },
    required: true
});

// Check 3: TypeScript definitions exist
checks.push({
    name: 'TypeScript definitions exist',
    test: () => fs.existsSync('index.d.ts'),
    required: false
});

// Check 4: Login function can be required
checks.push({
    name: 'Login function exports',
    test: () => {
        try {
            const login = require('./index');
            return typeof login === 'function' && typeof login.login === 'function';
        } catch (e) {
            console.error('   Error:', e.message);
            return false;
        }
    },
    required: true
});

// Check 5: Source files exist
checks.push({
    name: 'Source files exist',
    test: () => {
        return fs.existsSync('src') && 
               fs.existsSync('utils.js') && 
               fs.existsSync('logger.js');
    },
    required: true
});

// Check 6: lib/Main.js exists
checks.push({
    name: 'Main.js exists',
    test: () => fs.existsSync('lib/Main.js'),
    required: true
});

// Check 7: README exists
checks.push({
    name: 'README.md exists',
    test: () => fs.existsSync('README.md'),
    required: false
});

// Run checks
let passed = 0;
let failed = 0;
let warnings = 0;

checks.forEach(check => {
    const result = check.test();
    if (result) {
        console.log(`✅ ${check.name}`);
        passed++;
    } else {
        if (check.required) {
            console.log(`❌ ${check.name} (REQUIRED)`);
            failed++;
        } else {
            console.log(`⚠️  ${check.name} (optional)`);
            warnings++;
        }
    }
});

console.log('\n' + '='.repeat(50));
console.log(`Results: ${passed} passed, ${failed} failed, ${warnings} warnings`);
console.log('='.repeat(50));

if (failed > 0) {
    console.log('\n❌ Structure verification FAILED');
    console.log('Please fix the required issues above.\n');
    process.exit(1);
} else {
    console.log('\n✅ Structure verification PASSED');
    console.log('FCA package is ready for use with GoatBot-V2!\n');
    console.log('Next steps:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Use in GoatBot-V2 by installing this package');
    console.log('3. See README.md for usage instructions\n');
    process.exit(0);
}
