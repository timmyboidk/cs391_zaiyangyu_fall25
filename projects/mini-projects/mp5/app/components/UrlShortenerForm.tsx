"use client";
import {Button, FormHelperText, TextField, InputAdornment, IconButton} from "@mui/material";
import {useEffect, useState} from "react";
import createShortUrl from "@/lib/createShortUrl";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function UrlShortenerForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState("");
    const [copied, setCopied] = useState(false);

    // Set base URL only on the client
    useEffect(() => {
        if (typeof window !== "undefined") {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setBaseUrl(`${window.location.origin}/r/`);
        }
    }, []); // This is the correct way to get client-side data

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessUrl(null);
        setCopied(false);

        createShortUrl(alias, url)
            .then((newUrlEntry) => {
                setSuccessUrl(`${baseUrl}${newUrlEntry.alias}`);
                setUrl("");
                setAlias("");
            })
            .catch((err: Error) => {
                console.error(err);
                setError(err.message);
            });
    };

    const handleCopy = () => {
        if (successUrl) {
            navigator.clipboard.writeText(successUrl).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    return (
        <form className={"w-96 rounded-xl p-4 bg-sky-400"} onSubmit={handleSubmit}>
            <h3 className="text-2xl font-bold text-center text-white mb-3">URL Shortener</h3>
            <TextField
                variant="filled"
                sx={{backgroundColor: "white", width: "10rows0%", mb: 2}}
                label="Full URL (e.g., https://...)"
                value={url}
                // Fix for 'e' implicitly has an 'any' type
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
            />
            <TextField
                variant="filled"
                sx={{backgroundColor: "white", width: "100%"}}
                label="Desired Alias"
                value={alias}
                // Fix for 'e' implicitly has an 'any' type
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <span className="text-gray-500 text-sm">{baseUrl}</span>
                        </InputAdornment>
                    ),
                }}
            />

            {error && (
                <FormHelperText error={true} sx={{
                    color: 'red.900',
                    fontWeight: 'bold',
                    backgroundColor: 'white',
                    padding: '0.5rem',
                    marginTop: '1rem',
                    borderRadius: '4px'
                }}>
                    {error}
                </FormHelperText>
            )}

            <div className={"w-full flex justify-center mt-4"}>
                <Button
                    sx={{width: "100px"}}
                    variant="contained"
                    type="submit"
                    disabled={url === "" || alias === ""}
                >
                    Shorten
                </Button>
            </div>

            {successUrl && (
                <div className="mt-4 p-3 bg-white rounded">
                    <p className="text-sm font-semibold text-green-800">Success! Your link:</p>
                    <div className="flex items-center justify-between">
                        <a
                            href={successUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline truncate pr-2"
                        >
                            {successUrl}
                        </a>
                        <IconButton onClick={handleCopy} size="small" title="Copy URL">
                            {copied ? <ContentCopyIcon sx={{color: 'green.500'}}/> : <ContentCopyIcon/>}
                        </IconButton>
                    </div>
                    {copied && <span className="text-xs text-green-700">Copied to clipboard!</span>}
                </div>
            )}
        </form>
    );
}