"use client";
import {Button, FormHelperText, TextField, InputAdornment, IconButton} from "@mui/material";
import {useEffect, useState, FormEvent, ChangeEvent} from "react";
import createShortUrl from "@/lib/createShortUrl";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import {isValidUrl} from "@/lib/validator";

export default function UrlShortenerForm() {
    const [url, setUrl] = useState("");
    const [alias, setAlias] = useState("");
     const [error, setError] = useState<string | null>(null);
    const [successUrl, setSuccessUrl] = useState<string | null>(null);
    const [baseUrl, setBaseUrl] = useState("");
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setTimeout(() => {
                setBaseUrl(`${window.location.origin}/r/`);
            }, 0);
        }
    }, []);

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        setError(null);
        setSuccessUrl(null);
        setCopied(false);

        // Frontend Validation
        if (!isValidUrl(url)) {
            setError("Invalid URL. Please check for typos (e.g., .com is missing).");
            return;
        }

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
        <form className={"w-full max-w-md rounded-xl p-6 md:p-8 shadow-lg bg-[#CBF3BB]"} onSubmit={handleSubmit}>
            <h3 className="text-3xl font-bold text-center text-gray-800 mb-6">URL Shortener</h3>
            <TextField
                variant="filled"
                sx={{
                    backgroundColor: "#ECF4E8",
                    width: "100%",
                    mb: 2,
                    borderRadius: '4px'
                }}
                label="Full URL (e.g., https://...)"
                value={url}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                InputProps={{disableUnderline: true}}
            />
            <TextField
                variant="filled"
                sx={{
                    backgroundColor: "#ECF4E8",
                    width: "100%",
                    borderRadius: '4px'
                }}
                label="Desired Alias"
                value={alias}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setAlias(e.target.value)}
                InputProps={{
                    disableUnderline: true,
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
                    backgroundColor: 'rgba(255, 200, 200, 0.8)',
                    padding: '0.5rem',
                    marginTop: '1rem',
                    borderRadius: '4px'
                }}>
                    {error}
                </FormHelperText>
            )}
            <div className={"w-full flex justify-center mt-6"}>
                <Button
                    sx={{
                        width: "120px",
                        height: "40px",
                        fontWeight: "bold",
                        backgroundColor: "#93BFC7",
                        color: "#FFFFFF",
                        '&:hover': {
                            backgroundColor: "#80A8B1"
                        }
                    }}
                    variant="contained"
                    type="submit"
                    disabled={url === "" || alias === ""}
                >
                    Shorten
                </Button>
            </div>

            {successUrl && (
                <div className="mt-6 p-3 bg-[#ABE7B2] rounded shadow-sm">
                    <p className="text-sm font-semibold text-gray-800">Success! Your link:</p>
                    <div className="flex items-center justify-between">
                        <a
                            href={successUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-700 underline truncate pr-2"
                        >
                            {successUrl}
                        </a>
                        <IconButton onClick={handleCopy} size="small" title="Copy URL">
                            {copied ? <ContentCopyIcon sx={{color: 'green'}}/> : <ContentCopyIcon/>}
                        </IconButton>
                    </div>
                    {copied && <span className="text-xs text-green-800">Copied to clipboard!</span>}
                </div>
            )}
        </form>
    );
}