#!/usr/bin/env node

/**
 * LeetCode Stats Updater
 *
 * Fetches current LeetCode contest stats and updates README badges
 * Usage: node scripts/update-stats.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

const LEETCODE_USERNAME = 'furic';
const CONTEST_API_URL = `https://alfa-leetcode-api.onrender.com/userContestRankingInfo/${LEETCODE_USERNAME}`;
const PROFILE_API_URL = `https://alfa-leetcode-api.onrender.com/userProfile/${LEETCODE_USERNAME}`;
const README_PATH = path.join(__dirname, '..', 'README.md');

/**
 * Fetch data from URL
 */
function fetchData(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                try {
                    resolve(JSON.parse(data));
                } catch (error) {
                    reject(error);
                }
            });
        }).on('error', reject);
    });
}

/**
 * Format number with commas
 */
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

/**
 * Update README badges
 */
function updateReadme(contestStats, profileStats) {
    const rating = Math.floor(contestStats.rating);
    const ranking = formatNumber(contestStats.globalRanking);
    const total = formatNumber(contestStats.totalParticipants);
    const solved = formatNumber(profileStats.totalSolved);
    const questions = formatNumber(profileStats.totalQuestions);
    const percentage = (profileStats.totalSolved * 100 / profileStats.totalQuestions).toFixed(1);

    let content = fs.readFileSync(README_PATH, 'utf8');

    // Update Contest Rating badge
    content = content.replace(
        /Contest_Rating-\d+/g,
        `Contest_Rating-${rating}`
    );

    // Update Global Ranking badge
    content = content.replace(
        /Global_Ranking-[\d,]+\/[\d,]+/g,
        `Global_Ranking-${ranking}/${total}`
    );

    // Update Problems Solved badge
    content = content.replace(
        /Solved-[\d,]+\/[\d,]+/g,
        `Solved-${solved}/${questions}`
    );

    // Update Solve Percentage badge
    content = content.replace(
        /Solve_Rate-[\d.]+%25/g,
        `Solve_Rate-${percentage}%25`
    );

    fs.writeFileSync(README_PATH, content);

    console.log(`✅ Updated LeetCode stats:`);
    console.log(`   Contest Rating: ${rating}`);
    console.log(`   Global Ranking: ${ranking}/${total}`);
    console.log(`   Top Percentage: ${contestStats.topPercentage.toFixed(2)}%`);
    console.log(`   Problems Solved: ${solved}/${questions}`);
    console.log(`   Solve Rate: ${percentage}%`);
}

/**
 * Main function
 */
async function main() {
    try {
        console.log('🔄 Fetching LeetCode stats...');

        const [contestStats, profileStats] = await Promise.all([
            fetchData(CONTEST_API_URL).catch(err => {
                console.warn('Contest API failed, using fallback data:', err.message);
                return {
                    rating: 1672,
                    globalRanking: 112896,
                    totalParticipants: 760696,
                    topPercentage: 15.17
                };
            }),
            fetchData(PROFILE_API_URL).catch(err => {
                console.warn('Profile API failed, using fallback data:', err.message);
                return {
                    totalSolved: 250,
                    totalQuestions: 3686
                };
            })
        ]);

        if (!contestStats.rating && !profileStats.totalSolved) {
            throw new Error('Both APIs failed');
        }

        updateReadme(contestStats, profileStats);
        console.log('🎉 README.md updated successfully!');

    } catch (error) {
        console.error('❌ Error updating stats:', error.message);
        process.exit(1);
    }
}

main();