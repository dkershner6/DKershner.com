import { graphql } from '@octokit/graphql';
import { Octokit } from '@octokit/rest';
import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

const handler = nc();

handler.post(
    async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
        const octokit = new Octokit({
            auth: process.env.GITHUB_PERSONAL_TOKEN,
            userAgent: 'DKershner.com'
        });

        const results = await graphql(
            `
                query getContributions($start: DateTime!, $end: DateTime!) {
                    viewer {
                        contributionsCollection(from: $start, to: $end) {
                            startedAt
                            endedAt
                            restrictedContributionsCount
                            totalCommitContributions
                            totalIssueContributions
                            totalRepositoryContributions
                            totalPullRequestContributions
                            totalPullRequestReviewContributions
                        }
                    }
                    rateLimit {
                        cost
                        used
                        remaining
                    }
                }
            `,
            {
                headers: {
                    authorization: `token ${process.env.GITHUB_PERSONAL_TOKEN}`
                },

                start: '2018-01-01T00:00:00Z',
                end: '2019-01-01T00:00:00Z'
            }
        );
        console.log(
            results,
            results?.viewer?.contributionsCollection?.contributionCalendar
        );

        // const results = await octokit.search.issuesAndPullRequests({
        //     q:
        //         'is:closed is:pr author:dkershner6 archived:false sort:updated-desc'
        // });

        // if (results?.data?.items) {
        //     {
        //         const result = results.data.items[0];
        //         //for (const result of results.data.items) {
        //         const pullRequest = await octokit.request({ url: result.url });
        //         console.log(pullRequest.data);
        //     }
        // }
        // const repos = await octokit.repos.listForAuthenticatedUser({
        //     per_page: 100
        // });

        // const repo = await octokit.repos.get({
        //     owner: 'dkershner6',
        //     repo: 'dkershner.com'
        // });
        // console.log(repo);
        // const commits = await octokit.repos.listCommits({
        //     owner: repo.data.owner.login,
        //     repo: repo.data.name,
        //     author: 'dkershner6'
        // });

        // console.log(commits.data);

        return res.status(200).json({});
    }
);

export default handler;