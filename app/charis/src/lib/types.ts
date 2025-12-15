/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/charis.json`.
 */
export type Charis = {
  "address": "DDkLjak8nU9GRs1L9v3SPkXYXj8357qFr6JCSPPsuPqZ",
  "metadata": {
    "name": "charis",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "Created with Anchor"
  },
  "instructions": [
    {
      "name": "initializeCreator",
      "discriminator": [
        29,
        153,
        44,
        99,
        52,
        172,
        81,
        115
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true
        },
        {
          "name": "vaultState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "creatorProfile",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  99,
                  114,
                  101,
                  97,
                  116,
                  111,
                  114,
                  95,
                  112,
                  114,
                  111,
                  102,
                  105,
                  108,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "bio",
          "type": "string"
        }
      ]
    },
    {
      "name": "sendTip",
      "discriminator": [
        231,
        88,
        56,
        242,
        241,
        6,
        31,
        59
      ],
      "accounts": [
        {
          "name": "fan",
          "writable": true,
          "signer": true
        },
        {
          "name": "creator"
        },
        {
          "name": "vaultState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "fanStats",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  102,
                  97,
                  110,
                  95,
                  115,
                  116,
                  97,
                  116,
                  115
                ]
              },
              {
                "kind": "account",
                "path": "fan"
              }
            ]
          }
        },
        {
          "name": "tipRecord",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  116,
                  105,
                  112,
                  95,
                  114,
                  101,
                  99,
                  111,
                  114,
                  100
                ]
              },
              {
                "kind": "account",
                "path": "fan"
              },
              {
                "kind": "account",
                "path": "vault_state.total_no_tips_received",
                "account": "vaultState"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        },
        {
          "name": "message",
          "type": "string"
        }
      ]
    },
    {
      "name": "withdrawTips",
      "discriminator": [
        107,
        192,
        228,
        68,
        165,
        120,
        164,
        23
      ],
      "accounts": [
        {
          "name": "creator",
          "writable": true,
          "signer": true,
          "relations": [
            "vaultState"
          ]
        },
        {
          "name": "vaultState",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116,
                  95,
                  115,
                  116,
                  97,
                  116,
                  101
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "vault",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  118,
                  97,
                  117,
                  108,
                  116
                ]
              },
              {
                "kind": "account",
                "path": "creator"
              }
            ]
          }
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "creatorProfile",
      "discriminator": [
        251,
        250,
        184,
        111,
        214,
        178,
        32,
        221
      ]
    },
    {
      "name": "fanStats",
      "discriminator": [
        71,
        135,
        121,
        94,
        180,
        10,
        227,
        3
      ]
    },
    {
      "name": "tipRecord",
      "discriminator": [
        43,
        243,
        62,
        130,
        183,
        4,
        81,
        185
      ]
    },
    {
      "name": "vaultState",
      "discriminator": [
        228,
        196,
        82,
        165,
        98,
        210,
        235,
        152
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "nameEmpty",
      "msg": "Name cannot be empty"
    },
    {
      "code": 6001,
      "name": "nameTooLong",
      "msg": "Name exceeds maximum length of 50 characters"
    },
    {
      "code": 6002,
      "name": "bioTooLong",
      "msg": "Bio exceeds maximum length of 200 characters"
    },
    {
      "code": 6003,
      "name": "messageTooLong",
      "msg": "Message exceeds maximum length of 100 characters"
    },
    {
      "code": 6004,
      "name": "invalidAmount",
      "msg": "Tip amount must be greater than zero"
    },
    {
      "code": 6005,
      "name": "belowMinimumTip",
      "msg": "Tip amount below minimum of 0.1 USDC"
    },
    {
      "code": 6006,
      "name": "exceedsMaximumTip",
      "msg": "Tip amount exceeds maximum of 1,000 USDC"
    },
    {
      "code": 6007,
      "name": "selfTip",
      "msg": "Cannot tip yourself"
    },
    {
      "code": 6008,
      "name": "insufficientFunds",
      "msg": "Insufficient funds to complete this transaction"
    },
    {
      "code": 6009,
      "name": "insufficientVaultBalance",
      "msg": "Vault balance insufficient for withdrawal"
    },
    {
      "code": 6010,
      "name": "unauthorizedWithdrawal",
      "msg": "Unauthorized withdrawal attempt"
    },
    {
      "code": 6011,
      "name": "belowMinimumWithdrawal",
      "msg": "Withdrawal must be at least 5 USDC"
    },
    {
      "code": 6012,
      "name": "mathOverflow",
      "msg": "Arithmetic overflow occurred"
    }
  ],
  "types": [
    {
      "name": "creatorProfile",
      "docs": [
        "Creator's public profile information"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "bio",
            "type": "string"
          },
          {
            "name": "createdAt",
            "type": "i64"
          },
          {
            "name": "updatedAt",
            "type": "i64"
          },
          {
            "name": "isActive",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "fanStats",
      "docs": [
        "Statistics for individual fans"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "fan",
            "type": "pubkey"
          },
          {
            "name": "totalTipsSent",
            "type": "u64"
          },
          {
            "name": "totalAmountSent",
            "type": "u64"
          },
          {
            "name": "biggestTip",
            "type": "u64"
          },
          {
            "name": "smallestTip",
            "type": "u64"
          },
          {
            "name": "firstTipAt",
            "type": "i64"
          },
          {
            "name": "lastTipAt",
            "type": "i64"
          },
          {
            "name": "creatorsSupported",
            "type": "u64"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "tipRecord",
      "docs": [
        "Individual tip transaction record"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creatorVault",
            "type": "pubkey"
          },
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "fan",
            "type": "pubkey"
          },
          {
            "name": "amount",
            "type": "u64"
          },
          {
            "name": "timestamp",
            "type": "i64"
          },
          {
            "name": "message",
            "type": "string"
          },
          {
            "name": "isAnonymous",
            "type": "bool"
          },
          {
            "name": "bump",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "vaultState",
      "docs": [
        "Tracks creator's vault statistics and earnings"
      ],
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "creator",
            "type": "pubkey"
          },
          {
            "name": "vault",
            "type": "pubkey"
          },
          {
            "name": "totalEarnings",
            "type": "u64"
          },
          {
            "name": "totalSupporters",
            "type": "u64"
          },
          {
            "name": "totalAmountOfTipsReceived",
            "type": "u64"
          },
          {
            "name": "totalNoTipsReceived",
            "type": "u64"
          },
          {
            "name": "tipsThisMonth",
            "type": "u64"
          },
          {
            "name": "averageTip",
            "type": "u64"
          },
          {
            "name": "lastTipAt",
            "type": "i64"
          },
          {
            "name": "monthStartTimestamp",
            "type": "i64"
          },
          {
            "name": "vaultStateBump",
            "type": "u8"
          },
          {
            "name": "vaultBump",
            "type": "u8"
          }
        ]
      }
    }
  ]
};
