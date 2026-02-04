import type { PageServerLoad } from './$types';

interface GitHubRepoData {
    stargazers_count: number;
}

interface NPMDownloadsData {
    downloads: number;
}

// Enable prerendering for this page
export const prerender = true;

function formatNumber(num: number): string {
    if (num >= 1000) {
        return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'k+';
    }
    return num.toString();
}

export const load: PageServerLoad = async () => {
    const GITHUB_REPO = 'tufantunc/opentwig';
    const NPM_PACKAGE = 'opentwig';

    let githubStars = 0;
    let npmDownloads = 0;

    try {
        // Fetch GitHub stars
        const githubResponse = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
            headers: {
                'Accept': 'application/vnd.github.v3+json',
                'User-Agent': 'OpenTwig-Website'
            }
        });

        if (githubResponse.ok) {
            const githubData: GitHubRepoData = await githubResponse.json();
            githubStars = githubData.stargazers_count;
            console.log(`✓ GitHub stars fetched: ${githubStars}`);
        } else {
            console.warn(`⚠ GitHub API error: ${githubResponse.status} ${githubResponse.statusText}`);
        }
    } catch (error) {
        console.warn('⚠ Failed to fetch GitHub stars:', error);
    }

    try {
        // Fetch NPM total downloads (all time)
        const npmResponse = await fetch(
            `https://api.npmjs.org/downloads/range/2015-01-01:${new Date().toISOString().split('T')[0]}/${NPM_PACKAGE}`,
            {
                headers: {
                    'Accept': 'application/json'
                }
            }
        );

        if (npmResponse.ok) {
            const npmData = await npmResponse.json();
            // Sum up all daily downloads
            npmDownloads = npmData.downloads.reduce(
                (sum: number, day: { downloads: number }) => sum + day.downloads,
                0
            );
            console.log(`✓ NPM downloads fetched: ${npmDownloads}`);
        } else {
            console.warn(`⚠ NPM API error: ${npmResponse.status} ${npmResponse.statusText}`);
        }
    } catch (error) {
        console.warn('⚠ Failed to fetch NPM downloads:', error);
    }

    return {
        stats: {
            githubStars,
            npmDownloads,
            formattedGithubStars: formatNumber(githubStars),
            formattedNpmDownloads: formatNumber(npmDownloads)
        }
    };
};
