import postsData from '@/old_files/tempDatabase/posts.json' assert { type: 'json' };

const BIN_ID = "690651bfd0ea881f40cc6adb";
const URL = `https://api.jsonbin.io/v3/b/${BIN_ID}`;

export function getPosts() {
    return postsData;
}


