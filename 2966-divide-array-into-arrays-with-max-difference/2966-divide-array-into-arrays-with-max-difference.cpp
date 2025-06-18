class Solution {
private:
    static constexpr uint MAXV = 100'000u;
    static uint counts[MAXV];

public:
    static vector<vector<int>> divideArray(vector<int>& nums, const uint k) noexcept __attribute__((hot)) {
        const uint n = nums.size();
        vector<vector<int>> r;
        r.reserve(n / 3u);
        if (n == 3u) {
            if (max(nums[0], max(nums[1], nums[2])) <= k + min(nums[0], min(nums[1], nums[2])))
                r.emplace_back(std::move(nums));
            return r;
        }
        if (n <= 15u) {
            sort(nums.begin(), nums.end());
            const auto end = nums.cend();
            for (auto it = nums.begin(); it != end; it += 3u) {
                if (it[2] > it[0] + k) {
                    r.clear();
                    r.shrink_to_fit();
                    return r;
                }
                r.emplace_back(it, it + 3u);
            }
            return r;
        }
        uint minv = nums.front(), maxv = minv;
        for (uint v : nums) {
            counts[v-1u]++;
            minv = min(minv, v);
            maxv = max(maxv, v);
        }
        r.emplace_back();
        r.back().reserve(3u);
        uint c = counts[minv-1u];
        {
            const uint m = min(c, 3u);
            r.back().insert(r.back().end(), m, minv);
            c -= m;
        }
        uint v;
        for (v = minv; v <= maxv; ) {
            if (c) {
                uint s = r.back().size();
                if (s >= 3u) {
                    r.emplace_back();
                    r.back().reserve(3u);
                }
                auto &row = r.back();
                const uint m = min(3u - s, c);
                row.insert(row.end(), m, v);
                if (row.size() == 3u && row.back() > k + row.front()) {
                    r.clear();
                    r.shrink_to_fit();
                    break;
                }
                c -= m;
            } else {
                counts[v-1u] = 0;
                v++;
                if (v <= maxv) c = counts[v-1u];
            }
        }
        fill(counts + (v - 1u), counts + maxv, 0u);
        return r;
    }
};

uint Solution::counts[MAXV];

auto init = []() noexcept {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);
    cout.tie(nullptr);
    return 'c';
}();