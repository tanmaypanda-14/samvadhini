#include<bits/stdc++.h>
const int N = 1e5 + 5;

using namespace std;
int parent[N];
int rank[N];

void make_set(int x) {
    parent[x] = x;
    rank[x] = 0;
}

int find_set(int x) {
    if (parent[x] != x)
        parent[x] = find_set(parent[x]);
    return parent[x];
}

void union_set(int x, int y) {
    int x_root = find_set(x);
    int y_root = find_set(y);
    if (rank[x_root] > rank[y_root])
        parent[y_root] = x_root;
    else {
        parent[x_root] = y_root;
        if (rank[x_root] == rank[y_root])
            rank[y_root]++;
    }
}

int main() {
    int n, m;
    cin >> n >> m;
    for (int i = 0; i < n; i++)
        make_set(i);
    for (int i = 0; i < m; i++) {
        int x, y;
        cin >> x >> y;
        union_set(x, y);
    }
    int ans = 0;
    for (int i = 0; i < n; i++)
        if (find_set(i) == i)
            ans++;
    cout << ans << endl;
    return 0;
}